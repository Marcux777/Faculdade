package com.cinema.api.config;

import com.cinema.api.models.Filme;
import com.cinema.api.models.Ingresso;
import com.cinema.api.models.Sala;
import com.cinema.api.models.Sessao;
import com.cinema.api.repositories.FilmeRepository;
import com.cinema.api.repositories.IngressoRepository;
import com.cinema.api.repositories.SalaRepository;
import com.cinema.api.repositories.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DbInitializer implements CommandLineRunner {

    @Autowired
    private FilmeRepository filmeRepository;
    
    @Autowired
    private SalaRepository salaRepository;
    
    @Autowired
    private SessaoRepository sessaoRepository;
    
    @Autowired
    private IngressoRepository ingressoRepository;
    
    @Override
    public void run(String... args) {
        // Adicionar alguns filmes
        Filme filme1 = new Filme();
        filme1.setTitulo("Matrix");
        filme1.setDuracao(136);
        filme1.setClassificacao("14");
        filme1.setGenero("Ficção Científica");
        filmeRepository.save(filme1);
        
        Filme filme2 = new Filme();
        filme2.setTitulo("Inception");
        filme2.setDuracao(148);
        filme2.setClassificacao("14");
        filme2.setGenero("Ficção Científica");
        filmeRepository.save(filme2);
        
        // Adicionar algumas salas
        Sala sala1 = new Sala();
        sala1.setNumero("1");
        sala1.setCapacidade(100);
        sala1.setTipo("3D");
        salaRepository.save(sala1);
        
        Sala sala2 = new Sala();
        sala2.setNumero("2");
        sala2.setCapacidade(80);
        sala2.setTipo("2D");
        salaRepository.save(sala2);
        
        // Adicionar algumas sessões
        Sessao sessao1 = new Sessao();
        sessao1.setFilme(filme1);
        sessao1.setSala(sala1);
        sessao1.setData(LocalDate.of(2025, 6, 2));
        sessao1.setHorario(LocalTime.of(19, 0));
        sessao1.setValorIngresso(new BigDecimal("30.00"));
        sessaoRepository.save(sessao1);
        
        Sessao sessao2 = new Sessao();
        sessao2.setFilme(filme2);
        sessao2.setSala(sala2);
        sessao2.setData(LocalDate.of(2025, 6, 2));
        sessao2.setHorario(LocalTime.of(20, 0));
        sessao2.setValorIngresso(new BigDecimal("25.00"));
        sessaoRepository.save(sessao2);
        
        // Adicionar alguns ingressos
        Ingresso ingresso1 = new Ingresso();
        ingresso1.setSessao(sessao1);
        ingresso1.setQuantidade(2);
        ingresso1.setTipoIngresso(Ingresso.TipoIngresso.INTEIRA);
        ingresso1.setValorTotal(new BigDecimal("60.00"));
        ingressoRepository.save(ingresso1);
    }
}
