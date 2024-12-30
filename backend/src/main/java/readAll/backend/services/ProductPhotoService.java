package readAll.backend.services;

import org.springframework.core.io.ClassPathResource;


import java.io.IOException;
import java.nio.file.Files;


import org.springframework.core.io.Resource;

import org.springframework.http.MediaType;


import org.springframework.stereotype.Service;



@Service
public class ProductPhotoService {

    public byte[] getProductPhoto(String fileName) throws IOException {
        String validFileName = (fileName == null || fileName.isEmpty()) ? "brakfoto.png" : fileName;
        Resource resource = new ClassPathResource("public/images/" + validFileName);
        return Files.readAllBytes(resource.getFile().toPath());
    }

    public MediaType getMediaType(String fileName) {
        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        switch (fileExtension) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            default:
                return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}
