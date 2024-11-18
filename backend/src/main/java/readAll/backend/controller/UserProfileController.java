package readAll.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import readAll.backend.dtos.UserDto;
import readAll.backend.model.UserInfo;
import readAll.backend.services.UserInfoService;



@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserInfoService userInfoService;

    @GetMapping
    public ResponseEntity<UserInfo> getCurrentUserInfo(Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();
        return userInfoService.getUserInfoByUserId(userDto.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserInfo> addUserInfo(@RequestBody UserInfo userInfo, Authentication authentication) {
        UserDto userDto = (UserDto) authentication.getPrincipal();
        UserInfo createdUserInfo = userInfoService.createUserInfo(userInfo, userDto.getId());
        return new ResponseEntity<>(createdUserInfo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<UserInfo> updateUserInfo(@RequestBody UserInfo userInfo, Authentication authentication) {

        UserDto userDto = (UserDto) authentication.getPrincipal();
        UserInfo updatedUserInfo = userInfoService.updateUserInfo(userInfo, userDto.getId());
        return ResponseEntity.ok(updatedUserInfo);
    }
}

