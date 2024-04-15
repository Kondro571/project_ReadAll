package readAll.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_info")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String name;
    
    private String surname;
    
    @Column(name = "mobile_number")
    private String mobileNumber;
    
    private String address;

}