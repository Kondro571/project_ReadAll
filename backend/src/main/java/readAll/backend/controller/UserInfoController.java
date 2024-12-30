package readAll.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;


import readAll.backend.model.UserInfo;
import readAll.backend.services.UserInfoService;

import java.util.List;
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
