package product.inventory.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import product.inventory.management.entity.ProductEntity;
import product.inventory.management.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ProductEntity createProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public ProductEntity getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public ProductEntity updateProduct(Long id, ProductEntity productEntity) {
        ProductEntity existingProductEntity = productRepository.findById(id).orElse(null);

        if (existingProductEntity != null) {

            existingProductEntity.setName(productEntity.getName());
            existingProductEntity.setDescription(productEntity.getDescription());
            existingProductEntity.setPrice(productEntity.getPrice());
            existingProductEntity.setCategory(productEntity.getCategory());
            existingProductEntity.setQuantity(productEntity.getQuantity());

            return productRepository.save(existingProductEntity);

        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<ProductEntity> getPaginatedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    @Override
    public List<String> listAllCategories() {
        return productRepository.listAllCategories();
    }

    @Override
    public Page<ProductEntity> filterByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategory(category, pageable);
    }

    @Override
    public Page<ProductEntity> filterByPriceRange(Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByPriceRange(minPrice, maxPrice, pageable);
    }

    @Override
    public Page<ProductEntity> searchProducts(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

}
