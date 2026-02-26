package com.autoflex.productioncontrol.service;

import com.autoflex.productioncontrol.dto.ProductDTO;
import com.autoflex.productioncontrol.dto.RawMaterialDTO;
import com.autoflex.productioncontrol.entity.Product;
import com.autoflex.productioncontrol.entity.RawMaterial;
import com.autoflex.productioncontrol.mapper.BaseMapper;
import com.autoflex.productioncontrol.repository.ProductRepository;
import com.autoflex.productioncontrol.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final BaseMapper mapper;

    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(mapper::toProductDTO);
    }

    @Transactional
    public ProductDTO saveProduct(ProductDTO dto) {
        Product product = mapper.toProduct(dto);
        if (product.getMaterials() != null) {
            product.getMaterials().forEach(m -> m.setProduct(product));
        }
        return mapper.toProductDTO(productRepository.save(product));
    }

    @Transactional(readOnly = true)
    public Page<RawMaterialDTO> getAllMaterials(Pageable pageable) {
        return rawMaterialRepository.findAll(pageable).map(mapper::toRawMaterialDTO);
    }

    @Transactional
    public RawMaterialDTO saveMaterial(RawMaterialDTO dto) {
        return mapper.toRawMaterialDTO(rawMaterialRepository.save(mapper.toRawMaterial(dto)));
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void deleteMaterial(Long id) {
        // Note: This might fail if there are products using this material
        rawMaterialRepository.deleteById(id);
    }
}
