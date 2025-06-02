package com.cinema.api.services;

import com.cinema.api.dtos.SessaoDTO;
import com.cinema.api.models.Filme;
import com.cinema.api.models.Sala;
import com.cinema.api.models.Sessao;
import com.cinema.api.repositories.FilmeRepository;
import com.cinema.api.repositories.SalaRepository;
import com.cinema.api.repositories.SessaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessaoService {
    
    @Autowired
    private SessaoRepository sessaoRepository;
    
    @Autowired
    private FilmeRepository filmeRepository;
    
    @Autowired
    private SalaRepository salaRepository;
    
    public List<Sessao> listarTodas() {
        return sessaoRepository.findAll();
    }
    
    public Optional<Sessao> buscarPorId(Long id) {
        return sessaoRepository.findById(id);
    }
    
    public Sessao salvar(SessaoDTO sessaoDTO) {
        Filme filme = filmeRepository.findById(sessaoDTO.getFilmeId())
                .orElseThrow(() -> new EntityNotFoundException("Filme não encontrado"));
                
        Sala sala = salaRepository.findById(sessaoDTO.getSalaId())
                .orElseThrow(() -> new EntityNotFoundException("Sala não encontrada"));
                
        Sessao sessao = new Sessao();
        sessao.setFilme(filme);
        sessao.setSala(sala);
        sessao.setData(sessaoDTO.getData());
        sessao.setHorario(sessaoDTO.getHorario());
        sessao.setValorIngresso(sessaoDTO.getValorIngresso());
        
        return sessaoRepository.save(sessao);
    }
    
    public Optional<Sessao> atualizar(Long id, SessaoDTO sessaoDTO) {
        return sessaoRepository.findById(id)
                .map(sessaoExistente -> {
                    Filme filme = filmeRepository.findById(sessaoDTO.getFilmeId())
                            .orElseThrow(() -> new EntityNotFoundException("Filme não encontrado"));
                            
                    Sala sala = salaRepository.findById(sessaoDTO.getSalaId())
                            .orElseThrow(() -> new EntityNotFoundException("Sala não encontrada"));
                    
                    sessaoExistente.setFilme(filme);
                    sessaoExistente.setSala(sala);
                    sessaoExistente.setData(sessaoDTO.getData());
                    sessaoExistente.setHorario(sessaoDTO.getHorario());
                    sessaoExistente.setValorIngresso(sessaoDTO.getValorIngresso());
                    
                    return sessaoRepository.save(sessaoExistente);
                });
    }
    
    public void excluir(Long id) {
        sessaoRepository.deleteById(id);
    }
}
