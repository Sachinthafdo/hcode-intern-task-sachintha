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

    @Query("SELECT p.category FROM ProductEntity p GROUP BY p.category")
    List<String> listAllCategories();

    Page<ProductEntity> findAll(Pageable pageable);

    Page<ProductEntity> findByCategory(String category, Pageable pageable);

    Page<ProductEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    Page<ProductEntity> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
            Pageable pageable);

}
