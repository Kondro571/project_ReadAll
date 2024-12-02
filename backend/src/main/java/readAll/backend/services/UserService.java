package readAll.backend.services;


// import com.sergio.jwt.backend.dtos.CredentialsDto;
// import com.sergio.jwt.backend.dtos.SignUpDto;
// import com.sergio.jwt.backend.dtos.UserDto;
// import com.sergio.jwt.backend.entites.User;
// import com.sergio.jwt.backend.enums.Role;
// import com.sergio.jwt.backend.exceptions.AppException;
// import com.sergio.jwt.backend.mappers.UserMapper;
// import com.sergio.jwt.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import readAll.backend.dtos.CredentialsDto;
import readAll.backend.dtos.SignUpDto;
import readAll.backend.dtos.UserDto;
import readAll.backend.enums.Role;
import readAll.backend.exception.AppException;
import readAll.backend.mapper.UserMapper;
import readAll.backend.model.PasswordResetToken;
import readAll.backend.model.User;
import readAll.backend.repository.PasswordResetTokenRepository;
import readAll.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.time.LocalDateTime;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;




import java.util.List;
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        if (doesUserExistByEmail(userDto.getEmail())) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    // public String generatePasswordResetToken(String email) {
    //     User user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new RuntimeException("User not found"));
    
    //     // Usuń istniejący token dla użytkownika (jeśli istnieje)
    //     tokenRepository.deleteByUser(user);
    
    //     // Generate new token
    //     String token = UUID.randomUUID().toString();
    
    //     // Save new token to database
    //     PasswordResetToken resetToken = new PasswordResetToken();
    //     resetToken.setToken(token);
    //     resetToken.setUser(user);
    //     resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
    //     tokenRepository.save(resetToken);
    
    //     return token;
    // }

    public String generatePasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Sprawdź, czy istnieje już token dla użytkownika
        PasswordResetToken resetToken = tokenRepository.findByUser(user)
                .orElse(new PasswordResetToken());
    
        // Ustaw nowy token i datę wygaśnięcia
        String token = UUID.randomUUID().toString();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
    
        // Zapisz token
        tokenRepository.save(resetToken);
    
        return token;
    }

    


    


    public boolean verifyToken(String token) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        return true;
    }
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }
    
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword)); // Password hashing
        userRepository.save(user);
    
        tokenRepository.delete(resetToken); // Delete the token after use
    }
    









    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException("User not found with ID: " + id, HttpStatus.NOT_FOUND));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean doesUserExistByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserDto getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException("User not authenticated", HttpStatus.UNAUTHORIZED);
        }
        return (UserDto) authentication.getPrincipal();
    }

    public UserDto createUser(User user) {
        if (doesUserExistByEmail(user.getEmail())) {
            throw new AppException("User with this email already exists", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }
}
