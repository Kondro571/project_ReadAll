package readAll.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
}
