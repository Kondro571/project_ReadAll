package readAll.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUserId(Long userId);
}
