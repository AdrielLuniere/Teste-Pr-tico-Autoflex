package com.autoflex.productioncontrol.controller;

import com.autoflex.productioncontrol.dto.ProductionSuggestionDTO;
import com.autoflex.productioncontrol.service.ProductionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductionController {

    private final ProductionService productionService;

    @GetMapping("/suggestions")
    public ResponseEntity<List<ProductionSuggestionDTO>> getSuggestions() {
        return ResponseEntity.ok(productionService.getProductionSuggestions());
    }
}
