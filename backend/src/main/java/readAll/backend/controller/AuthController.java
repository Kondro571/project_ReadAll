package readAll.backend.controller;

// import com.sergio.jwt.backend.config.UserAuthenticationProvider;
// import com.sergio.jwt.backend.dtos.CredentialsDto;
// import com.sergio.jwt.backend.dtos.SignUpDto;
// import com.sergio.jwt.backend.dtos.UserDto;
// import com.sergio.jwt.backend.services.UserService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import readAll.backend.config.UserAuthenticationProvider;
import readAll.backend.dtos.CredentialsDto;
import readAll.backend.dtos.SignUpDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.services.EmailService;
import readAll.backend.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
     @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        try {
            String token = userService.generatePasswordResetToken(email);
   

            // Send email with reset link
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            emailService.sendEmail(email, "Password Reset Request", 
                "Click the link to reset your password: " + resetLink);

            return ResponseEntity.ok("Reset password email sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify-token")
    public ResponseEntity<String> verifyToken(@RequestParam String token) {
        boolean isValid = userService.verifyToken(token);
        return isValid ? ResponseEntity.ok("Token is valid.") 
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
    }

    @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
            try {
                userService.resetPassword(token, newPassword);
                return ResponseEntity.ok("Password reset successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
            }
    }



}