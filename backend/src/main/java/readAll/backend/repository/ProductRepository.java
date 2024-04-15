package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
