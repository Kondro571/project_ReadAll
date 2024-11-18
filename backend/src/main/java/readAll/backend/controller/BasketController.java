package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.BasketDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.model.Basket;
import readAll.backend.services.BasketService;
import readAll.backend.services.UserService;

import org.springframework.security.core.Authentication;

import java.util.List;


@RestController
@RequestMapping("/baskets")
public class BasketController {

    private final BasketService basketService;
    private final UserService userService;

    @Autowired
    public BasketController(BasketService basketService, UserService userService) {
        this.basketService = basketService;
        this.userService = userService;
    }

    @GetMapping
    public List<Basket> getAllBaskets() {
        return basketService.getAllBaskets();
    }

    @PostMapping
    public Basket createBasket(@RequestBody Basket basket) {
        return basketService.createBasket(basket);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Basket>> getMyBasket() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        List<Basket> myBaskets = basketService.getUserBaskets(userDto.getId());
        return new ResponseEntity<>(myBaskets, HttpStatus.OK);
    }

    @PostMapping("/me")
    public ResponseEntity<Basket> addProductToBasket(@RequestBody BasketDto basketDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        Basket savedBasket = basketService.addProductToBasket(userDto.getId(), basketDto);
        return new ResponseEntity<>(savedBasket, HttpStatus.CREATED);
    }

    @DeleteMapping("/me/{basketId}")
    public ResponseEntity<Void> deleteBasket(@PathVariable Long basketId) {
        basketService.deleteBasket(basketId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
