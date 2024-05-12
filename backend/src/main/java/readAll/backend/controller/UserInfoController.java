package readAll.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import readAll.backend.model.UserInfo;
import readAll.backend.repository.UserInfoRepository;

import java.util.List;

@RestController
@RequestMapping("/user-info")
public class UserInfoController {
    
    @Autowired
    private UserInfoRepository userInfoRepository;

    @GetMapping
    public List<UserInfo> getAllUserInfos() {
        return userInfoRepository.findAll();
    }

    @PostMapping
    public UserInfo createUserInfo(@RequestBody UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }
}
