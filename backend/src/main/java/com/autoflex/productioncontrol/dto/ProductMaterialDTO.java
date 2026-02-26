package com.autoflex.productioncontrol.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductMaterialDTO {
    private Long id;

    @NotNull(message = "Material ID is required")
    private Long rawMaterialId;

    private String rawMaterialName;

    @NotNull(message = "Required quantity is required")
    @Positive(message = "Required quantity must be positive")
    private BigDecimal requiredQuantity;
}
