package readAll.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@RestController
    public static class TestController {

		@CrossOrigin(origins = "http://localhost:3000")
        @GetMapping("/api/test")
        public String testBackend() {
            return "ololololol dzła!!";
        }
		@GetMapping("/")
		public String index() {
			return "Strona główna aplikacji!";
		}
    }

}
