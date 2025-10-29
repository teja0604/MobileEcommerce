package com.springBoot.projectAPI.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.springBoot.projectAPI.dto.Product;
import com.springBoot.projectAPI.repository.ProductRepository;
import com.springBoot.projectAPI.service.ProductService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

	private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

//    @PostMapping("/saveProduct")
//    public Product addProduct(@RequestBody Product product) {
//        return productService.addProduct(product);
//    }
    
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProducts(@RequestParam("name") String name, @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stock") int stock,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("discount") int discount,
            @RequestParam("discountPrice") Double discountPrice,
            @RequestParam("isActive") Boolean isActive) {
        try {
            // Save the image file if provided
            String fileName = null;
            if (image != null && !image.isEmpty()) {
                File directory = new File(UPLOAD_DIR);
                if (!directory.exists()) {
                    directory.mkdir();
                }
                Path filePath = Paths.get(UPLOAD_DIR, image.getOriginalFilename());
                Files.write(filePath, image.getBytes());
                fileName = "/uploads/" + image.getOriginalFilename();
            }

            // Save product with the image path
            Product product = new Product(name, description, price, stock, fileName, discount, discountPrice, isActive);
            Product saved = productService.addProduct(product);
            return ResponseEntity.ok(saved);
        } catch (IOException ioe) {
            System.err.println("Error saving uploaded file: " + ioe.getMessage());
            ioe.printStackTrace();
            return ResponseEntity.status(500).body("File upload error: " + ioe.getMessage());
        } catch (Exception ex) {
            System.err.println("Error adding product: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Server error: " + ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updated = productService.updateProduct(id, product);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException rte) {
            // likely product not found
            System.err.println("Update failed: " + rte.getMessage());
            return ResponseEntity.status(404).body("Product not found: " + rte.getMessage());
        } catch (Exception ex) {
            System.err.println("Error updating product: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Server error: " + ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully!";
    }
    

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam("name") String name) {
        return productService.searchProductsByName(name);
    }
}

