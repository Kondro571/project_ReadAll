package readAll.backend.controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

@RestController
public class FileUploadController {

    @Value("${upload.path}")
    private String uploadPath;

    
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private ResourceLoader resourceLoader;

    @PostMapping("/upload-image")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        try {

            File uploadDir = new File("backend/src/main/resources/"+uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
                
            }

            
            

            String projectPath = new File("").getAbsolutePath();
            String filePath =projectPath+"\\backend\\src\\main\\resources\\public\\images\\"+file.getOriginalFilename();
            // System.out.println(projectPath);

            file.transferTo(new File(filePath));
            
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }
}
