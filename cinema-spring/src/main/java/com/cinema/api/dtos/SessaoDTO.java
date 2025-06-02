package com.cinema.api.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SessaoDTO {
    private Long id;
    
    @NotNull(message = "O filme é obrigatório")
    private Long filmeId;
    
    @NotNull(message = "A sala é obrigatória")
    private Long salaId;
    
    @NotNull(message = "A data da sessão é obrigatória")
    private LocalDate data;
    
    @NotNull(message = "O horário da sessão é obrigatório")
    private LocalTime horario;
    
    @Positive(message = "O valor do ingresso deve ser positivo")
    private BigDecimal valorIngresso;
}
