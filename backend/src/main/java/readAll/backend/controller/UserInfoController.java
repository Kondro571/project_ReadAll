package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import readAll.backend.dtos.UserDto;
import readAll.backend.model.User;
import readAll.backend.model.UserInfo;
import readAll.backend.repository.UserInfoRepository;
import readAll.backend.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user-info")
public class UserInfoController {
    
    @Autowired
    private UserInfoRepository userInfoRepository;
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserInfo> getAllUserInfos() {
        return userInfoRepository.findAll();
    }

    @PostMapping
    public UserInfo createUserInfo(@RequestBody UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> getUserInfoByUserId(@PathVariable Long userId) {
        Optional<UserInfo> userInfo = userInfoRepository.findByUserId(userId);
        return userInfo.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/profile")
    public ResponseEntity<UserInfo> getUserInfoByToken() {


        Optional<UserInfo> userInfo = userInfoRepository.findByUserId((long)65);
        return userInfo.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfo> getCurrentUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();
        
        Optional<UserInfo> userInfo = userInfoRepository.findByUserId(userDto.getId());
        return userInfo.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
        @PostMapping("/me")
    public ResponseEntity<UserInfo> addUserInfo(@RequestBody UserInfo userInfo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();
        
        // Znajdź użytkownika na podstawie ID
        User user = userService.findById(userDto.getId());

        // Ustaw powiązanie z użytkownikiem
        userInfo.setUser(user);

        // Zapisz dane użytkownika
        UserInfo savedUserInfo = userInfoRepository.save(userInfo);
        
        return new ResponseEntity<>(savedUserInfo, HttpStatus.CREATED);
    }

    @PutMapping("/me")
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo userInfo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto userDto = (UserDto) authentication.getPrincipal();

        // Znajdź użytkownika na podstawie ID
        User user = userService.findById(userDto.getId());

        // Sprawdź, czy istnieją informacje o użytkowniku
        Optional<UserInfo> existingUserInfo = userInfoRepository.findByUserId(user.getId());

        if (existingUserInfo.isPresent()) {
            UserInfo existingInfo = existingUserInfo.get();
            existingInfo.setName(userInfo.getName());
            existingInfo.setSurname(userInfo.getSurname());
            existingInfo.setMobileNumber(userInfo.getMobileNumber());
            existingInfo.setAddress(userInfo.getAddress());

            // Zapisz zaktualizowane informacje
            UserInfo updatedUserInfo = userInfoRepository.save(existingInfo);
            return ResponseEntity.ok(updatedUserInfo);
        } else {
            // Jeśli informacje nie istnieją, utwórz nowe
            userInfo.setUser(user);
            UserInfo newUserInfo = userInfoRepository.save(userInfo);
            return new ResponseEntity<>(newUserInfo, HttpStatus.CREATED);
        }
    }
}
