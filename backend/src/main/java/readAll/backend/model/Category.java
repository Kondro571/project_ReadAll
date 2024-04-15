package readAll.backend.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String description;
    
    private String name;
    
    @ManyToMany(mappedBy = "categories")
    private Set<Product> products;

}

