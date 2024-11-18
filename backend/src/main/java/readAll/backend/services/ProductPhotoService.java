package readAll.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import readAll.backend.dtos.ProductDto;
import readAll.backend.model.Category;
import readAll.backend.model.Product;
import readAll.backend.repository.CategoryRepository;
import readAll.backend.repository.ProductRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import org.springframework.stereotype.Service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;

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
