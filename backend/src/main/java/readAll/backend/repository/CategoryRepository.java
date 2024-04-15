package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

