package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
}
