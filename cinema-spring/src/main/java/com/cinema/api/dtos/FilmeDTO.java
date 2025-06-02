package com.cinema.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class FilmeDTO {
    private Long id;
    
    @NotBlank(message = "O título do filme é obrigatório")
    private String titulo;
    
    @Positive(message = "A duração deve ser um valor positivo")
    private Integer duracao;
    
    private String classificacao;
    
    private String genero;
}
