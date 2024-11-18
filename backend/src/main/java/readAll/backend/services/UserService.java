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
import readAll.backend.model.User;
import readAll.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;



import java.util.List;
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

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
