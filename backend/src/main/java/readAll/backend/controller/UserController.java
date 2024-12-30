package readAll.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;



import lombok.RequiredArgsConstructor;

import readAll.backend.dtos.UserDto;
import readAll.backend.model.User;
import readAll.backend.services.UserService;




import java.util.List;

// @RestController
// @RequestMapping("/users")
// public class UserController {
    
//     @Autowired
//     private UserRepository userRepository;
    
//     @PersistenceContext
//     private EntityManager entityManager;

//     @GetMapping
//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

    
//     @GetMapping("/me")
//     public ResponseEntity<UserDto> getCurrentUser() {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         UserDto userDto = (UserDto) authentication.getPrincipal();
        
//         return ResponseEntity.ok(userDto);
//     }


//     // @PostMapping
//     // public User createUser(@RequestBody User user) {
//     //     return userRepository.save(user);
//     // }
//     @PostMapping
//     public ResponseEntity<?> createUser(@RequestBody User user) {
//         Query query = entityManager.createQuery("SELECT COUNT(u) FROM User u WHERE u.emailAddress = :email");
//         query.setParameter("email", user.getEmail());
//         Long count = (Long) query.getSingleResult();
//         if (count > 0) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
//         }
        
//         entityManager.persist(user);
        
//         return ResponseEntity.status(HttpStatus.CREATED).body(user);
//     }

//     // @PostMapping
//     // public ResponseEntity<?> createUser(@RequestBody User user) {
//     //     if (userRepository.existsByEmailAddress(user.getEmailAddress())) {
//     //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
//     //     }
        
//     //     User savedUser = userRepository.save(user);
        
//     //     return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//     // }
// }



@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto currentUser = userService.getCurrentUser(authentication);
        return ResponseEntity.ok(currentUser);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody User user) {
        UserDto createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
