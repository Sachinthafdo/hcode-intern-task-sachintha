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

    Page<ProductEntity> getPaginatedProducts(int page, int size);

    List<String> listAllCategories();

    Page<ProductEntity> filterByCategory(String category, int page, int size);

    Page<ProductEntity> filterByPriceRange(Double minPrice, Double maxPrice, int page, int size);

    Page<ProductEntity> searchProducts(String name, int page, int size);

}
