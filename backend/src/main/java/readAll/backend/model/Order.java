package readAll.backend.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Orders")
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
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderProduct> orderProducts;

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Float getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public User getCustomer() {
        return customer;
    }
    
    public void setCustomer(User customer) {
        this.customer = customer;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getService() {
        return service;
    }
    
    public void setService(String service) {
        this.service = service;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }
    
    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customer=" + customer +
                ", totalAmount=" + totalAmount +
                ", dateTime=" + dateTime +
                ", status='" + status + '\'' +
                ", address='" + address + '\'' +
                ", service='" + service + '\'' +
                ", orderProducts=" + orderProducts +
                '}';
    }


}
