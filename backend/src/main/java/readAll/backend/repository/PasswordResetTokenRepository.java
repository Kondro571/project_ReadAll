package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import readAll.backend.model.PasswordResetToken;
import readAll.backend.model.User;

import java.time.LocalDateTime;

import java.util.Optional;


@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    void deleteByToken(String token);

    void deleteAllByExpiryDateBefore(LocalDateTime now); 

    void deleteByUser(User user);
    
    Optional<PasswordResetToken> findByUser(User user);

}
