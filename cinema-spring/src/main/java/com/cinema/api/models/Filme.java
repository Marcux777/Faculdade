package com.cinema.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O título do filme é obrigatório")
    private String titulo;
    
    @Positive(message = "A duração deve ser um valor positivo")
    private Integer duracao;
    
    private String classificacao;
    
    private String genero;
}
