package readAll.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

    // boolean existsByEmailAddress(String email);
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean existsByEmail(String email); // Dodanie tej metody


}
