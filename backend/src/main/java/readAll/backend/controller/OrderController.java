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
import readAll.backend.services.OrderProducer;
import readAll.backend.services.OrderService;
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

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        List<Order> orders = orderService.getUserOrders(userDto.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        Order savedOrder = orderService.createOrder(userDto.getId(), orderDto);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @DeleteMapping("/my-orders/{orderId}")
    public ResponseEntity<Void> deleteMyOrder(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        orderService.deleteOrder(orderId, userDto.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
