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
public class Sala {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "O número da sala é obrigatório")
    private String numero;
    
    @Positive(message = "A capacidade deve ser um valor positivo")
    private Integer capacidade;
    
    private String tipo;  // 2D, 3D, IMAX
}
