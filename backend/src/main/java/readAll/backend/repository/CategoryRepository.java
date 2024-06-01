package readAll.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

}

