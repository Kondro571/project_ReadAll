package readAll.backend.model;

// User.java
import jakarta.persistence.*;
import readAll.backend.enums.Role;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String password;
    
    @Column(name = "email_address")
    private String email;
    

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    // private String status;

    @OneToOne(mappedBy = "user")
    private UserInfo userInfo;








    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String emailAddress) {
        this.email = emailAddress;
    }

    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    // public String getStatus() {
    //     return status;
    // }
    
    // public void setStatus(String status) {
    //     this.status = status;
    // }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}


