package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import readAll.backend.dtos.ProductDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.model.Category;
import readAll.backend.model.Product;
import readAll.backend.repository.CategoryRepository;
import readAll.backend.repository.ProductRepository;
import readAll.backend.services.ProductPhotoService;
import readAll.backend.services.ProductService;

import java.io.IOException;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductPhotoService productPhotoService;

    @Autowired
    public ProductController(ProductService productService, ProductPhotoService productPhotoService) {
        this.productService = productService;
        this.productPhotoService = productPhotoService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        // Sprawdź rolę użytkownika
        if (!userDto.getRole().name().equals("ADMIN")) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Zwróć błąd 403, jeśli nie ma uprawnień
        }

        Product product = productService.createProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        // Opcjonalnie: sprawdź, czy użytkownik ma prawo edytować produkt
        if (!userDto.getRole().name().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Product updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }



    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getProductPhoto(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            String fileName = product.getImage();
            byte[] photoBytes = productPhotoService.getProductPhoto(fileName);
            MediaType mediaType = productPhotoService.getMediaType(fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            headers.setContentLength(photoBytes.length);

            return new ResponseEntity<>(photoBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
