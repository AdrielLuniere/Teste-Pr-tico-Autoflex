package com.autoflex.productioncontrol.controller;

import com.autoflex.productioncontrol.dto.ProductDTO;
import com.autoflex.productioncontrol.dto.RawMaterialDTO;
import com.autoflex.productioncontrol.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> getProducts(Pageable pageable) {
        return ResponseEntity.ok(inventoryService.getAllProducts(pageable));
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(inventoryService.saveProduct(dto));
    }

    @GetMapping("/materials")
    public ResponseEntity<Page<RawMaterialDTO>> getMaterials(Pageable pageable) {
        return ResponseEntity.ok(inventoryService.getAllMaterials(pageable));
    }

    @PostMapping("/materials")
    public ResponseEntity<RawMaterialDTO> createMaterial(@Valid @RequestBody RawMaterialDTO dto) {
        return ResponseEntity.ok(inventoryService.saveMaterial(dto));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        inventoryService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/materials/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable Long id) {
        inventoryService.deleteMaterial(id);
        return ResponseEntity.ok().build();
    }
}
