package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import readAll.backend.model.OrderProduct;
import readAll.backend.repository.OrderProductRepository;

import java.util.List;

@RestController
@RequestMapping("/api/order-products")
public class OrderProductController {
    
    @Autowired
    private OrderProductRepository orderProductRepository;

    @GetMapping("/")
    public List<OrderProduct> getAllOrderProducts() {
        return orderProductRepository.findAll();
    }

    @PostMapping("/")
    public OrderProduct createOrderProduct(@RequestBody OrderProduct orderProduct) {
        return orderProductRepository.save(orderProduct);
    }
}
