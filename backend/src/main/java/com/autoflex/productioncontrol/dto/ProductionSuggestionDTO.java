package com.autoflex.productioncontrol.dto;

import lombok.*;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductionSuggestionDTO {
    private Long productId;
    private String productName;
    private Long suggestedQuantity;
    private java.math.BigDecimal unitPrice;
    private Map<Long, String> missingMaterials; // MaterialId -> Reason/Needed
}
