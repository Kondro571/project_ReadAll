package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.OrderDto;
import readAll.backend.dtos.OrderResponseDto;
import readAll.backend.dtos.UserDto;

import readAll.backend.model.Order;

import readAll.backend.services.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;


import java.util.List;

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
    
    @GetMapping("/my-order/{orderId}")
    public ResponseEntity<Order> getMyOrder(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();


        Order order = orderService.getOrder(userDto.getId(), orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderDto orderDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        OrderResponseDto responseDto = orderService.createOrder(userDto.getId(), orderDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PostMapping("/{orderId}/retry-payment")
    public ResponseEntity<String> retryPayment(@PathVariable Long orderId) {
        String redirectUri = orderService.repeatPayment(orderId);
        return ResponseEntity.ok(redirectUri);
    }




    @GetMapping("/verify-payment/{orderId}")
    public ResponseEntity<String> verifyPaymentForOrder(@PathVariable Long orderId) {
        try {
            String result = orderService.verifyPaymentForOrder(orderId);

            if ("Order has been paid successfully".equals(result)) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error verifying payment: " + e.getMessage());
        }
    }





    @DeleteMapping("/my-orders/{orderId}")
    public ResponseEntity<Void> deleteMyOrder(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        orderService.deleteOrder(orderId, userDto.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
