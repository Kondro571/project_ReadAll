package readAll.backend.datamysql;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepozitory extends JpaRepository<Category, Long> {
    // Dodatkowe metody związane z operacjami bazodanowymi można tutaj umieścić
}
