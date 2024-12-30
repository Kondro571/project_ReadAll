package readAll.backend.services;


import lombok.RequiredArgsConstructor;


import readAll.backend.model.User;
import readAll.backend.model.UserInfo;
import readAll.backend.repository.UserInfoRepository;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final UserService userService;

    public List<UserInfo> getAllUserInfos() {
        return userInfoRepository.findAll();
    }

    public UserInfo createUserInfo(UserInfo userInfo, Long userId) {
        User user = userService.findById(userId);
        userInfo.setUser(user);
        return userInfoRepository.save(userInfo);
    }

    public Optional<UserInfo> getUserInfoByUserId(Long userId) {
        return userInfoRepository.findByUserId(userId);
    }

    public UserInfo updateUserInfo(UserInfo userInfo, Long userId) {
        // Znajdź użytkownika na podstawie ID
        User user = userService.findById(userId);
    
        // Sprawdź, czy istnieją informacje o użytkowniku
        Optional<UserInfo> existingUserInfo = userInfoRepository.findByUserId(user.getId());
    
        if (existingUserInfo.isPresent()) {
            UserInfo existingInfo = existingUserInfo.get();
            existingInfo.setName(userInfo.getName());
            existingInfo.setSurname(userInfo.getSurname());
            existingInfo.setMobileNumber(userInfo.getMobileNumber());
            existingInfo.setAddress(userInfo.getAddress());
    
            // Zapisz zaktualizowane informacje
            return userInfoRepository.save(existingInfo); // W przypadku aktualizacji
        } else {
            // Jeśli informacje nie istnieją, utwórz nowe
            userInfo.setUser(user);
            return userInfoRepository.save(userInfo); // W przypadku tworzenia
        }
    }
    
}

