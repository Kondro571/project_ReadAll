package readAll.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
        List<Order> findByCustomerId(Long customerId);
        Order findByIdAndCustomerId(Long orderId,Long customerId);

}
