package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import readAll.backend.model.User;
import readAll.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // @PostMapping
    // public User createUser(@RequestBody User user) {
    //     return userRepository.save(user);
    // }
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        Query query = entityManager.createQuery("SELECT COUNT(u) FROM User u WHERE u.emailAddress = :email");
        query.setParameter("email", user.getEmail());
        Long count = (Long) query.getSingleResult();
        if (count > 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
        }
        
        entityManager.persist(user);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    // @PostMapping
    // public ResponseEntity<?> createUser(@RequestBody User user) {
    //     if (userRepository.existsByEmailAddress(user.getEmailAddress())) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
    //     }
        
    //     User savedUser = userRepository.save(user);
        
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    // }
}
