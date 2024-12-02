package readAll.backend.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import com.fasterxml.jackson.databind.ObjectMapper;

import readAll.backend.model.Order;
import readAll.backend.model.Transaction;
import readAll.backend.repository.OrderRepository;
import readAll.backend.repository.TransactionRepository;


@Service
public class PayUService {

    private static final String PAYU_AUTH_URL = "https://secure.snd.payu.com/pl/standard/user/oauth/authorize";
    private static final String PAYU_ORDER_URL = "https://secure.snd.payu.com/api/v2_1/orders";

    @Value("${payu.clientId}")
    private String clientId;

    @Value("${payu.clientSecret}")
    private String clientSecret;

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final TransactionRepository transactionRepository;
    private final OrderRepository orderRepository;

    public PayUService(ObjectMapper objectMapper, TransactionRepository transactionRepository, OrderRepository orderRepository) {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = objectMapper;
        this.transactionRepository = transactionRepository;
        this.orderRepository = orderRepository;
    }

    private String getAccessToken() {
        try {
            Map<String, String> params = new HashMap<>();
            params.put("grant_type", "client_credentials");
            params.put("client_id", clientId);
            params.put("client_secret", clientSecret);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(PAYU_AUTH_URL))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(buildFormUrlEncodedString(params)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == HttpStatus.OK.value()) {
                Map<String, Object> responseBody = objectMapper.readValue(response.body(), Map.class);
                return (String) responseBody.get("access_token");
            } else {
                throw new RuntimeException("Failed to obtain access token from PayU");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error getting access token from PayU", e);
        }
    }

    private String buildFormUrlEncodedString(Map<String, String> params) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (sb.length() > 0) {
                sb.append("&");
            }
            sb.append(entry.getKey()).append("=").append(entry.getValue());
        }
        return sb.toString();
    }


    

    private Map<String, Object> prepareOrderPayload(Order order) {
        Map<String, Object> orderPayload = new HashMap<>();
        orderPayload.put("notifyUrl", "http://localhost:3000/books");
        orderPayload.put("continueUrl", "http://localhost:3000/check-order/"+order.getId());
        orderPayload.put("customerIp", "127.0.0.1");
        orderPayload.put("merchantPosId", clientId);
        orderPayload.put("description", "Order Payment");
        orderPayload.put("currencyCode", "PLN");
        orderPayload.put("totalAmount", Math.round(order.getTotalAmount() * 100));
    
        Map<String, Object> buyer = new HashMap<>();
        buyer.put("email", order.getCustomer().getEmail());
        buyer.put("language", "pl");
        orderPayload.put("buyer", buyer);
    
        Map<String, Object> product = new HashMap<>();
        product.put("name", "Order Payment");
        product.put("unitPrice", Math.round(order.getTotalAmount() * 100));
        product.put("quantity", 1);
        orderPayload.put("products", List.of(product));
    
        return orderPayload;
    }
    

    private void saveTransaction(Order order, Map<String, Object> responseBody) {
        Transaction transaction = new Transaction();

        
        transaction.setTransactionId((String) responseBody.get("orderId")); // ID transakcji zwrócony przez PayU
        transaction.setOrder(order);
        transaction.setResponse("response"); // Cała odpowiedź jako String
        transaction.setStatus(false); // Początkowy status, aktualizowany później
        transaction.setDateTime(LocalDateTime.now());
        transaction.setAmount(order.getTotalAmount()); // Kwota zamówienia

        transactionRepository.save(transaction);



    }
    

    public String createPayment(Long orderId) {
        try {
            String accessToken = getAccessToken();
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
    
            // Przygotowanie zamówienia
            Map<String, Object> orderPayload = prepareOrderPayload(order);
            String orderJson = objectMapper.writeValueAsString(orderPayload);
    
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(PAYU_ORDER_URL))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + accessToken)
                    .POST(HttpRequest.BodyPublishers.ofString(orderJson))
                    .build();
    
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Response Status Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());
            System.out.println(response.toString());


            

            if (response.statusCode() == HttpStatus.OK.value() || response.statusCode() == HttpStatus.FOUND.value()) {

                Map<String, Object> responseBody = objectMapper.readValue(response.body(), Map.class);
                String redirectUri = (String) responseBody.get("redirectUri");
                // Zapis transakcji
                saveTransaction(order, responseBody);
                System.out.println("juz nie wiem");
    
                return redirectUri;
            } else {
                throw new RuntimeException("Failed to create payment order with PayU");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error creating payment with PayU", e);
        }
    }
    
    

    public boolean verifyPayment(String transactionId) {
        try {

            String accessToken = getAccessToken();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(PAYU_ORDER_URL + "/" + transactionId))
                    .header("Authorization", "Bearer " + accessToken)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            if (response.statusCode() == HttpStatus.OK.value()) {
                Map<String, Object> responseBody = objectMapper.readValue(response.body(), Map.class);
                Map<String, Object> status = (Map<String, Object>) responseBody.get("status");
                String statusCode = (String) status.get("statusCode");

                if ("SUCCESS".equals(statusCode)) {
                    // Update transaction status in the database
                    Transaction transaction = transactionRepository.findById(transactionId)
                            .orElseThrow(() -> new RuntimeException("Transaction not found"));
                    transaction.setStatus(true);
                    transactionRepository.save(transaction);

                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Error verifying payment with PayU", e);
        }
    }
}
