package readAll.backend.datamysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    
    @Autowired
    private CategoryRepozitory kategoriaRepository;

    @GetMapping("/kategorie")
    public List<Category> wszystkieKategorie() {
        return kategoriaRepository.findAll();
    }
    @GetMapping("/kk")
    public String index() {
        return "Strona główna aplikacji!";
    }
}
