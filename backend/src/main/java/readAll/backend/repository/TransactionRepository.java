package readAll.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import readAll.backend.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}

