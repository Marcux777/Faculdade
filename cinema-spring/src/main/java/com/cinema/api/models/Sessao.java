package com.cinema.api.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sessao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "filme_id", nullable = false)
    private Filme filme;
    
    @ManyToOne
    @JoinColumn(name = "sala_id", nullable = false)
    private Sala sala;
    
    @NotNull(message = "A data da sessão é obrigatória")
    private LocalDate data;
    
    @NotNull(message = "O horário da sessão é obrigatório")
    private LocalTime horario;
    
    @Positive(message = "O valor do ingresso deve ser positivo")
    private BigDecimal valorIngresso;
}
