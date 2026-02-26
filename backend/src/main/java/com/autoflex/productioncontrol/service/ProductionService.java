package com.autoflex.productioncontrol.service;

import com.autoflex.productioncontrol.dto.ProductionSuggestionDTO;
import com.autoflex.productioncontrol.entity.Product;
import com.autoflex.productioncontrol.entity.ProductMaterial;
import com.autoflex.productioncontrol.entity.RawMaterial;
import com.autoflex.productioncontrol.repository.ProductRepository;
import com.autoflex.productioncontrol.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductionService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    @Transactional(readOnly = true)
    public List<ProductionSuggestionDTO> getProductionSuggestions() {
        List<Product> products = productRepository.findAllByOrderByPriceDesc();
        Map<Long, BigDecimal> virtualStock = rawMaterialRepository.findAll().stream()
                .collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));

        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            long possibleToProduce = Long.MAX_VALUE;
            Map<Long, String> missing = new HashMap<>();

            if (product.getMaterials() == null || product.getMaterials().isEmpty()) {
                possibleToProduce = 0;
            } else {
                for (ProductMaterial pm : product.getMaterials()) {
                    BigDecimal available = virtualStock.getOrDefault(pm.getRawMaterial().getId(), BigDecimal.ZERO);
                    BigDecimal required = pm.getRequiredQuantity();

                    if (required.compareTo(BigDecimal.ZERO) > 0) {
                        long units = available.divide(required, 0, RoundingMode.FLOOR).longValue();
                        possibleToProduce = Math.min(possibleToProduce, units);

                        if (units == 0) {
                            missing.put(pm.getRawMaterial().getId(),
                                    "Insufficient stock. Needs " + required + " per unit.");
                        }
                    }
                }
            }

            if (possibleToProduce > 0) {
                // Consume virtual stock
                for (ProductMaterial pm : product.getMaterials()) {
                    Long matId = pm.getRawMaterial().getId();
                    BigDecimal totalConsumed = pm.getRequiredQuantity().multiply(BigDecimal.valueOf(possibleToProduce));
                    virtualStock.put(matId, virtualStock.get(matId).subtract(totalConsumed));
                }
            }

            suggestions.add(ProductionSuggestionDTO.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .suggestedQuantity(possibleToProduce)
                    .unitPrice(product.getPrice())
                    .missingMaterials(missing)
                    .build());
        }

        return suggestions;
    }
}
