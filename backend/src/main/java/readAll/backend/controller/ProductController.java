package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.ProductDto;
import readAll.backend.model.Category;
import readAll.backend.model.Product;
import readAll.backend.repository.CategoryRepository;
import readAll.backend.repository.ProductRepository;

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
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        return productOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Product createProduct(@RequestBody ProductDto productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setAuthor(productDTO.getAuthor());
        product.setType(productDTO.getType());
        product.setImage(productDTO.getImage());

        Set<Category> categories = new HashSet<>();
        for (String categoryName : productDTO.getCategories()) {
            Category category = categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    return categoryRepository.save(newCategory);
                });
            categories.add(category);
        }
        product.setCategories(categories);

        return productRepository.save(product);
    }


    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productRepository.deleteById(productId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product");
        }
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getProductPhoto(@PathVariable Long id) {

        return productRepository.findById(id)
            .map(product -> {
                try {
                    String fileName = (product.getImage() == null || product.getImage().isEmpty()) 
                                      ? "brakfoto.png" 
                                      : product.getImage();

                    String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                    Resource resource = new ClassPathResource("public/images/" + fileName);
                    byte[] photoBytes = Files.readAllBytes(resource.getFile().toPath());

                    MediaType mediaType;
                    switch (fileExtension) {
                        case "jpg":
                        case "jpeg":
                            mediaType = MediaType.IMAGE_JPEG;
                            break;
                        case "png":
                            mediaType = MediaType.IMAGE_PNG;
                            break;
                        default:
                            mediaType = MediaType.APPLICATION_OCTET_STREAM;
                            break;
                    }

                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(mediaType); 
                    headers.setContentLength(photoBytes.length);

                    return new ResponseEntity<>(photoBytes, headers, HttpStatus.OK);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                         .body(("Error reading photo: " + e.getMessage()).getBytes());
                }
            })
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                  .body(("Product not found with id: " + id).getBytes()));
    }


}
