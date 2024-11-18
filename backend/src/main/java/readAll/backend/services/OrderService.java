package readAll.backend.services;
import org.springframework.beans.factory.annotation.Autowired;

import readAll.backend.dtos.OrderDto;
import readAll.backend.dtos.OrderResponseDto;
import readAll.backend.model.Basket;
import readAll.backend.model.Order;
import readAll.backend.model.OrderProduct;
import readAll.backend.model.Transaction;
import readAll.backend.model.User;
import readAll.backend.repository.BasketRepository;
import readAll.backend.repository.OrderProductRepository;
import readAll.backend.repository.OrderRepository;
import readAll.backend.repository.TransactionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final BasketRepository basketRepository;
    private final UserService userService;
    private final PayUService payUService;
    private final TransactionRepository transactionRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        OrderProductRepository orderProductRepository,
                        BasketRepository basketRepository,
                        UserService userService,
                        PayUService payUService,
                        TransactionRepository transactionRepository) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.basketRepository = basketRepository;
        this.userService = userService;
        this.payUService = payUService;
        this.transactionRepository = transactionRepository;
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByCustomerId(userId);
    }

    
    public OrderResponseDto createOrder(Long userId, OrderDto orderDto) {
    User customer = userService.findById(userId);
    List<Basket> baskets = basketRepository.findByCustomerId(customer.getId());

    if (baskets.isEmpty()) {
        throw new IllegalArgumentException("Basket is empty");
    }

    // Tworzenie zamówienia
    Order order = new Order();
    order.setCustomer(customer);
    order.setTotalAmount(calculateTotalAmount(baskets));
    order.setDateTime(LocalDateTime.now());
    order.setStatus("PENDING");
    order.setAddress(orderDto.getAddress());
    order.setService(orderDto.getService());

    Order savedOrder = orderRepository.save(order);

    // Przypisanie produktów do zamówienia
    List<OrderProduct> orderProducts = baskets.stream().map(basket -> {
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrder(savedOrder);
        orderProduct.setProduct(basket.getProduct());
        orderProduct.setQuantity(basket.getQuantity());
        return orderProduct;
    }).collect(Collectors.toList());

    orderProductRepository.saveAll(orderProducts);
    basketRepository.deleteAll(baskets);

    savedOrder.setOrderProducts(orderProducts);

    String redirectUri = null;
    try {
        // Inicjowanie płatności
        redirectUri = payUService.createPayment(savedOrder.getId());
        savedOrder.setStatus("PAYMENT_PENDING");
        orderRepository.save(savedOrder);
    } catch (Exception e) {
        // Jeśli płatność się nie uda, zapisujemy transakcję jako nieudaną
        Transaction failedTransaction = new Transaction();
        failedTransaction.setTransactionId("FAILED_" + savedOrder.getId());
        failedTransaction.setOrder(savedOrder);
        failedTransaction.setResponse("Initial payment failed");
        failedTransaction.setStatus(false);
        failedTransaction.setDateTime(LocalDateTime.now());
        failedTransaction.setAmount(savedOrder.getTotalAmount());
        transactionRepository.save(failedTransaction);
    }

    return new OrderResponseDto(savedOrder, redirectUri);
}

    public String repeatPayment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        try {
            // Wywołanie PayUService w celu ponowienia płatności
            return payUService.createPayment(order.getId());
        } catch (Exception e) {
            throw new RuntimeException("Error retrying payment", e);
        }
    }
    public void deleteOrder(Long orderId, Long userId) {
        Order order = orderRepository.findByIdAndCustomerId(orderId, userId);
        if (order == null) {
            throw new RuntimeException("Order not found or does not belong to the user");
        }
        orderRepository.delete(order);
    }

    private Float calculateTotalAmount(List<Basket> baskets) {
        return baskets.stream()
                .map(basket -> basket.getProduct().getPrice() * basket.getQuantity())
                .reduce(0f, Float::sum);
    }

    public String verifyPaymentForOrder(Long orderId) {
        // Pobierz zamówienie na podstawie ID
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        

        // Pobierz wszystkie transakcje przypisane do zamówienia
        List<Transaction> transactions = transactionRepository.findByOrder(order);

        boolean isPaid = false;

        for (Transaction transaction : transactions) {
            // Sprawdź status każdej transakcji
            System.out.println(transaction.getTransactionId());
            boolean paymentVerified = payUService.verifyPayment(transaction.getTransactionId());
            System.out.println("ccccccccccccccccccccccccccccccccc");

            if (paymentVerified) {
                isPaid = true; // Jeśli któraś transakcja jest opłacona, przerwij pętlę
                break;
            }
        }

        if (isPaid) {
            // Jeśli przynajmniej jedna transakcja jest opłacona, zmień status zamówienia
            order.setStatus("PAID");
            orderRepository.save(order);
            return "Order has been paid successfully";
        } else {
            return "No successful payment found for this order";
        }
    }
}
