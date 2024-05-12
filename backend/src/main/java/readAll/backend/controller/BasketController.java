package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import readAll.backend.model.Basket;
import readAll.backend.repository.BasketRepository;

import java.util.List;

@RestController
@RequestMapping("/baskets")
public class BasketController {

    @Autowired
    private BasketRepository basketRepository;

    @GetMapping
    public List<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

    @PostMapping
    public Basket createBasket(@RequestBody Basket basket) {
        return basketRepository.save(basket);
    }

}
