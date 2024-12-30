package readAll.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String description;
    
    private String name;
    
    // @ManyToMany(mappedBy = "categories")
    // private Set<Product> products;

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // public Set<Product> getProducts() {
    //     return products;
    // }
    
    // public void setProducts(Set<Product> products) {
    //     this.products = products;
    // }
    

}

