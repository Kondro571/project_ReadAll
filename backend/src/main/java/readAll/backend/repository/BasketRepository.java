package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import readAll.backend.model.Basket;
import java.util.List;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    List<Basket> findByCustomerId(Long customerId);

}
