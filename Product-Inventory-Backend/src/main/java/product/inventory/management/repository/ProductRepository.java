package product.inventory.management.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import product.inventory.management.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    // Filter by category
    List<ProductEntity> findByCategory(String category);

    // Filter by minPrice and maxPrice
    @Query("SELECT p FROM ProductEntity p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<ProductEntity> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);

    // pagination
    Page<ProductEntity> findAll(Pageable pageable);

}
