package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.BasketDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.model.Basket;
import readAll.backend.model.Product;
import readAll.backend.model.User;
import readAll.backend.repository.BasketRepository;
import readAll.backend.repository.ProductRepository;
import readAll.backend.services.UserService;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/baskets")
public class BasketController {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private ProductRepository productRepository;  // Assuming you have a ProductRepository

    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

    @PostMapping
    public Basket createBasket(@RequestBody Basket basket) {
        return basketRepository.save(basket);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Basket>> getMyBasket() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();
        
        List<Basket> myBaskets = basketRepository.findByCustomerId(userDto.getId());
        return new ResponseEntity<>(myBaskets, HttpStatus.OK);
    }

    @PostMapping("/me")
    public ResponseEntity<Basket> addProductToBasket(@RequestBody BasketDto basketDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        User customer = userService.findById(userDto.getId());
        Product product = productRepository.findById(basketDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Basket basket = new Basket();
        basket.setCustomer(customer);
        basket.setProduct(product);
        basket.setQuantity(basketDto.getQuantity());

        Basket savedBasket = basketRepository.save(basket);
        return new ResponseEntity<>(savedBasket, HttpStatus.CREATED);
    }



    @DeleteMapping("/me/{basketId}")
    public ResponseEntity<Void> deleteBasket(@PathVariable Long basketId) {
        System.out.println("sssssssssssssssssssssss");
        Basket basket = basketRepository.findById(basketId).orElse(null);

        if (basket == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        basketRepository.delete(basket);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}
