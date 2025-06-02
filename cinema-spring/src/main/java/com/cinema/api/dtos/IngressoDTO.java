package com.cinema.api.dtos;

import com.cinema.api.models.Ingresso.TipoIngresso;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class IngressoDTO {
    private Long id;
    
    @NotNull(message = "A sessão é obrigatória")
    private Long sessaoId;
    
    @Positive(message = "A quantidade deve ser um valor positivo")
    private Integer quantidade;
    
    @NotNull(message = "O tipo de ingresso é obrigatório")
    private TipoIngresso tipoIngresso;
    
    private BigDecimal valorTotal;
}
