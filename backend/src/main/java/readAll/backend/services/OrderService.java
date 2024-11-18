package readAll.backend.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.OrderDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.model.Basket;
import readAll.backend.model.Order;
import readAll.backend.model.OrderProduct;
import readAll.backend.model.User;
import readAll.backend.repository.BasketRepository;
import readAll.backend.repository.OrderProductRepository;
import readAll.backend.repository.OrderRepository;
import readAll.backend.services.OrderProducer;
import readAll.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;

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

    @Autowired
    private OrderProducer orderProducer;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderProductRepository orderProductRepository,
                        BasketRepository basketRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.basketRepository = basketRepository;
        this.userService = userService;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByCustomerId(userId);
    }

    public Order createOrder(Long userId, OrderDto orderDto) {
        User customer = userService.findById(userId);
        List<Basket> baskets = basketRepository.findByCustomerId(customer.getId());

        if (baskets.isEmpty()) {
            throw new IllegalArgumentException("Basket is empty");
        }

        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(calculateTotalAmount(baskets));
        order.setDateTime(LocalDateTime.now());
        order.setStatus("Pending");
        order.setAddress(orderDto.getAddress());
        order.setService(orderDto.getService());

        Order savedOrder = orderRepository.save(order);

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

        // Wyślij zamówienie do kolejki RabbitMQ
        // orderProducer.sendOrderMessage(savedOrder);

        return savedOrder;
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
}
