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
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
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

}