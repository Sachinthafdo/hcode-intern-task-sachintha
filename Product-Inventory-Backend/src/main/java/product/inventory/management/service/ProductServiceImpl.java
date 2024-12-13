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
    public List<ProductEntity> filterByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<ProductEntity> filterByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceRange(minPrice, maxPrice);
    }

    @Override
    public Page<ProductEntity> getPaginatedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

}
