package readAll.backend.controller;

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
import readAll.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private UserService userService;


    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();
        
        List<Order> orders = orderRepository.findByCustomerId(userDto.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        User customer = userService.findById(userDto.getId());
        List<Basket> baskets = basketRepository.findByCustomerId(customer.getId());

        if (baskets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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

        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    private Float calculateTotalAmount(List<Basket> baskets) {
        return baskets.stream()
                .map(basket -> basket.getProduct().getPrice() * basket.getQuantity())
                .reduce(0f, Float::sum);
    }
}