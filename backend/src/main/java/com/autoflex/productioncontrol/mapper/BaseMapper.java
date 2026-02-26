package com.autoflex.productioncontrol.mapper;

import com.autoflex.productioncontrol.dto.ProductDTO;
import com.autoflex.productioncontrol.dto.ProductMaterialDTO;
import com.autoflex.productioncontrol.dto.RawMaterialDTO;
import com.autoflex.productioncontrol.entity.Product;
import com.autoflex.productioncontrol.entity.ProductMaterial;
import com.autoflex.productioncontrol.entity.RawMaterial;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BaseMapper {

    ProductDTO toProductDTO(Product product);

    Product toProduct(ProductDTO productDTO);

    RawMaterialDTO toRawMaterialDTO(RawMaterial rawMaterial);

    RawMaterial toRawMaterial(RawMaterialDTO rawMaterialDTO);

    @Mapping(source = "rawMaterial.id", target = "rawMaterialId")
    @Mapping(source = "rawMaterial.name", target = "rawMaterialName")
    ProductMaterialDTO toProductMaterialDTO(ProductMaterial productMaterial);

    @Mapping(target = "product", ignore = true)
    @Mapping(source = "rawMaterialId", target = "rawMaterial.id")
    ProductMaterial toProductMaterial(ProductMaterialDTO productMaterialDTO);
}
