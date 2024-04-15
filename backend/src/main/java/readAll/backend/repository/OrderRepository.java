package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
