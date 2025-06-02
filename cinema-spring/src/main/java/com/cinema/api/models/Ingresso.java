package com.cinema.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingresso {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "sessao_id", nullable = false)
    private Sessao sessao;
    
    @Positive(message = "A quantidade deve ser um valor positivo")
    private Integer quantidade;
    
    @NotNull(message = "O tipo de ingresso é obrigatório")
    @Enumerated(EnumType.STRING)
    private TipoIngresso tipoIngresso;
    
    @Positive(message = "O valor total deve ser positivo")
    private BigDecimal valorTotal;
    
    public enum TipoIngresso {
        INTEIRA, MEIA
    }
}
