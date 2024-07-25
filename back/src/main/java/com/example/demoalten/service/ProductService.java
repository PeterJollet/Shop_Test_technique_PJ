package com.example.demoalten.service;

import com.example.demoalten.model.Product;
import com.example.demoalten.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }


    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product patchProduct(String id, Product product) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            if (product.getName() != null) existingProduct.setName(product.getName());
            if (product.getDescription() != null) existingProduct.setDescription(product.getDescription());
            if (product.getPrice() != null) existingProduct.setPrice(product.getPrice());
            if (product.getQuantity() != null) existingProduct.setQuantity(product.getQuantity());
            if (product.getInventoryStatus() != null) existingProduct.setInventoryStatus(product.getInventoryStatus());
            if (product.getCategory() != null) existingProduct.setCategory(product.getCategory());
            if (product.getImage() != null) existingProduct.setImage(product.getImage());
            if (product.getRating() != null) existingProduct.setRating(product.getRating());
            return productRepository.save(existingProduct);
        }
        return null;
    }


    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
