package com.autoflex.productioncontrol.repository;

import com.autoflex.productioncontrol.entity.ProductMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMaterialRepository extends JpaRepository<ProductMaterial, Long> {
}
