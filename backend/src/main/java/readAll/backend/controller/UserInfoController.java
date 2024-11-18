package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;

import readAll.backend.dtos.UserDto;
import readAll.backend.model.User;
import readAll.backend.model.UserInfo;
import readAll.backend.repository.UserInfoRepository;
import readAll.backend.services.UserInfoService;
import readAll.backend.services.UserService;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/user-info")
@RequiredArgsConstructor
public class UserInfoController {

    private final UserInfoService userInfoService;

    @GetMapping
    public List<UserInfo> getAllUserInfos() {
        return userInfoService.getAllUserInfos();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> getUserInfoByUserId(@PathVariable Long userId) {
        return userInfoService.getUserInfoByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
