package readAll.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import readAll.backend.dtos.BasketDto;
import readAll.backend.model.Basket;
import readAll.backend.model.Product;
import readAll.backend.model.User;
import readAll.backend.repository.BasketRepository;
import readAll.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class BasketService {

    private final BasketRepository basketRepository;
    private final ProductRepository productRepository;
    private final UserService userService;

    @Autowired
    public BasketService(BasketRepository basketRepository, ProductRepository productRepository, UserService userService) {
        this.basketRepository = basketRepository;
        this.productRepository = productRepository;
        this.userService = userService;
    }

    public List<Basket> getAllBaskets() {
        return basketRepository.findAll();
    }

    public Basket createBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    public List<Basket> getUserBaskets(Long userId) {
        return basketRepository.findByCustomerId(userId);
    }

    public Basket addProductToBasket(Long userId, BasketDto basketDto) {
        User customer = userService.findById(userId);
        Product product = productRepository.findById(basketDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Basket basket = new Basket();
        basket.setCustomer(customer);
        basket.setProduct(product);
        basket.setQuantity(basketDto.getQuantity());

        return basketRepository.save(basket);
    }

    public void deleteBasket(Long basketId) {
        Basket basket = basketRepository.findById(basketId)
                .orElseThrow(() -> new RuntimeException("Basket not found"));
        basketRepository.delete(basket);
    }
}
