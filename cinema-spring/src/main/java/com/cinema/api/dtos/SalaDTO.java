package com.cinema.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class SalaDTO {
    private Long id;
    
    @NotBlank(message = "O número da sala é obrigatório")
    private String numero;
    
    @Positive(message = "A capacidade deve ser um valor positivo")
    private Integer capacidade;
    
    private String tipo;  // 2D, 3D, IMAX
}
