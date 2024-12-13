package product.inventory.management.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import product.inventory.management.entity.ProductEntity;

@Service
public interface ProductService {

    List<ProductEntity> getAllProducts();

    ProductEntity createProduct(ProductEntity productEntity);

    ProductEntity getProductById(Long id);

    ProductEntity updateProduct(Long id, ProductEntity productEntity);

    void deleteProduct(Long id);

    List<ProductEntity> filterByCategory(String category);

    List<ProductEntity> filterByPriceRange(Double minPrice, Double maxPrice);

    Page<ProductEntity> getPaginatedProducts(int page, int size);
}
