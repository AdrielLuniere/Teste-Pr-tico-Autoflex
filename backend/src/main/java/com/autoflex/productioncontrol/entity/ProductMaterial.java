package com.autoflex.productioncontrol.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "PRODUCT_MATERIAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_material_seq")
    @SequenceGenerator(name = "product_material_seq", sequenceName = "PRODUCT_MATERIAL_SEQ", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RAW_MATERIAL_ID", nullable = false)
    private RawMaterial rawMaterial;

    @Column(name = "REQUIRED_QUANTITY", nullable = false, precision = 19, scale = 2)
    private BigDecimal requiredQuantity;
}
