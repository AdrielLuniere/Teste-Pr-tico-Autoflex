package com.autoflex.productioncontrol.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "RAW_MATERIAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "raw_material_seq")
    @SequenceGenerator(name = "raw_material_seq", sequenceName = "RAW_MATERIAL_SEQ", allocationSize = 1)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "STOCK_QUANTITY", nullable = false, precision = 19, scale = 2)
    private BigDecimal stockQuantity;

    @OneToMany(mappedBy = "rawMaterial", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<ProductMaterial> productMaterials;
}
