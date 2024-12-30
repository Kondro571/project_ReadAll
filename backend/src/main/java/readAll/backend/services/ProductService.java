package readAll.backend.services;

import org.springframework.beans.factory.annotation.Autowired;


import readAll.backend.dtos.ProductDto;
import readAll.backend.model.Category;
import readAll.backend.model.Product;
import readAll.backend.repository.CategoryRepository;
import readAll.backend.repository.ProductRepository;


import java.util.HashSet;
import java.util.List;

import java.util.Set;




import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        // product.setQuantity(productDto.getQuantity());
        product.setQuantity(100);

        product.setAuthor(productDto.getAuthor());
        product.setType(productDto.getType());
        product.setImage(productDto.getImage());

        Set<Category> categories = new HashSet<>();
        for (String categoryName : productDto.getCategories()) {
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

    public Product updateProduct(Long id, ProductDto productDto) {
        // Znajdź produkt do edycji
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    
        // Aktualizuj dane produktu
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setQuantity(100);
        
        product.setAuthor(productDto.getAuthor());
        product.setType(productDto.getType());
        product.setImage(productDto.getImage());
    
        // Aktualizuj kategorie
        Set<Category> categories = new HashSet<>();
        for (String categoryName : productDto.getCategories()) {
            Category category = categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(categoryName);
                    return categoryRepository.save(newCategory);
                });
            categories.add(category);
        }
        product.setCategories(categories);
    
        // Zapisz zmiany
        return productRepository.save(product);
    }
    

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
