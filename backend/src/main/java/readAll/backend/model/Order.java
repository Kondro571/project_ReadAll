package readAll.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "total_amount")
    private Float totalAmount;
    
    @Column(name = "date_time")
    private LocalDateTime dateTime;
    
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    private String address;
    
    private String service;

    
}
