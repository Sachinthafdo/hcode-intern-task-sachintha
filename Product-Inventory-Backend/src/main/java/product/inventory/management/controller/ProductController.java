package product.inventory.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import product.inventory.management.dto.ProductDto;
import product.inventory.management.entity.ProductEntity;
import product.inventory.management.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    ProductService productService;

    // get all products
    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        try {
            List<ProductEntity> products = productService.getAllProducts();
            return ResponseEntity.status(200).body(products);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // get product by id
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {

        try {

            ProductEntity product = productService.getProductById(id);

            if (product == null) {
                return ResponseEntity.status(404).body("Product not found");
            }
            return ResponseEntity.status(200).body(product);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // update product by id and productDto
    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            if (productDto.getName() == null || productDto.getName().isEmpty() ||
                    productDto.getPrice() == null || productDto.getPrice() <= 0 ||
                    productDto.getQuantity() == null || productDto.getQuantity() < 0 ||
                    productDto.getCategory() == null || productDto.getCategory().isEmpty()) {
                return ResponseEntity.status(400)
                        .body("Please enter a valid product name, price, category and quantity.");
            }
            ProductEntity product = productService.getProductById(id);

            if (product == null) {
                return ResponseEntity.status(404).body("Product not found");
            }

            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setCategory(productDto.getCategory());
            product.setQuantity(productDto.getQuantity());

            ProductEntity updatedProductEntity = productService.updateProduct(id, product);
            return ResponseEntity.status(200).body(updatedProductEntity);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // reduce some quantity on product by it's id and quantity to reduce
    @PutMapping("/products/reduce/{id}")
    public ResponseEntity<?> reduceQuantity(@PathVariable Long id, Long quantity) {
        try {
            ProductEntity product = productService.getProductById(id);

            if (product == null) {
                return ResponseEntity.status(404).body("Product not found");
            }

            if (product.getQuantity() < quantity) {
                return ResponseEntity.status(400).body("Not enough quantity");
            }
            product.setQuantity(product.getQuantity() - quantity);
            product = productService.updateProduct(id, product);
            return ResponseEntity.status(200).body(product);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // add new product by productDto
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody ProductDto productDto) {
        try {
            if (productDto.getName() == null || productDto.getName().isEmpty() ||
                    productDto.getPrice() == null || productDto.getPrice() <= 0 ||
                    productDto.getQuantity() == null || productDto.getQuantity() < 0 ||
                    productDto.getCategory() == null || productDto.getCategory().isEmpty()) {
                return ResponseEntity.status(400)
                        .body("Please enter a valid product name, price, category and quantity.");
            }

            ProductEntity product = new ProductEntity();

            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setPrice(productDto.getPrice());
            product.setCategory(productDto.getCategory());
            product.setQuantity(productDto.getQuantity());

            product = productService.createProduct(product);
            return ResponseEntity.status(200).body(product);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // delete product by id
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            ProductEntity product = productService.getProductById(id);

            if (product == null) {
                return ResponseEntity.status(404).body("Product not found");
            }
            productService.deleteProduct(id);
            return ResponseEntity.status(200).body("Product deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // Filter by category with pagination
    @GetMapping("/products/filter/category")
    public ResponseEntity<?> filterByCategory(
            @RequestParam String category,
            @RequestParam int page,
            @RequestParam int size) {
        try {

            if (page < 0 || size <= 0) {
                return ResponseEntity.status(400).body("Invalid pagination parameters");
            }
            Page<ProductEntity> products = productService.filterByCategory(category, page, size);
            return ResponseEntity.status(200).body(products);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // Filter by price range with pagination
    @GetMapping("/products/filter/price")
    public ResponseEntity<?> filterByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestParam int page,
            @RequestParam int size) {
        try {

            if (page < 0 || size <= 0) {
                return ResponseEntity.status(400).body("Invalid pagination parameters");
            }
            Page<ProductEntity> products = productService.filterByPriceRange(minPrice, maxPrice, page, size);
            return ResponseEntity.status(200).body(products);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // Search products by name with pagination
    @GetMapping("/products/filter/name")
    public ResponseEntity<?> searchProducts(
            @RequestParam String name,
            @RequestParam int page,
            @RequestParam int size) {
        try {

            if (page < 0 || size <= 0) {
                return ResponseEntity.status(400).body("Invalid pagination parameters");
            }
            Page<ProductEntity> matchingProducts = productService.searchProducts(name, page, size);
            return ResponseEntity.ok(matchingProducts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // pagination
    @GetMapping("/products/page")
    public ResponseEntity<?> getPaginatedProducts(@RequestParam int page, @RequestParam int size) {
        try {
            if (page < 0 || size <= 0) {
                return ResponseEntity.status(400).body("Invalid pagination parameters");
            }

            Page<ProductEntity> products = productService.getPaginatedProducts(page, size);
            return ResponseEntity.status(200).body(products);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

    // get all categories
    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        try {
            List<String> categories = productService.listAllCategories();
            return ResponseEntity.status(200).body(categories);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Please sorry! something went wrong.");
        }
    }

}
