package readAll.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import readAll.backend.model.Order;
import readAll.backend.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
        List<Transaction> findByOrder(Order order);
}

