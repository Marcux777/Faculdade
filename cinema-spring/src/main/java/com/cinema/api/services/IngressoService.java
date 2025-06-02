package com.cinema.api.services;

import com.cinema.api.dtos.IngressoDTO;
import com.cinema.api.models.Ingresso;
import com.cinema.api.models.Sessao;
import com.cinema.api.repositories.IngressoRepository;
import com.cinema.api.repositories.SessaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class IngressoService {
    
    @Autowired
    private IngressoRepository ingressoRepository;
    
    @Autowired
    private SessaoRepository sessaoRepository;
    
    public List<Ingresso> listarTodos() {
        return ingressoRepository.findAll();
    }
    
    public Optional<Ingresso> buscarPorId(Long id) {
        return ingressoRepository.findById(id);
    }
    
    public Ingresso salvar(IngressoDTO ingressoDTO) {
        Sessao sessao = sessaoRepository.findById(ingressoDTO.getSessaoId())
                .orElseThrow(() -> new EntityNotFoundException("Sessão não encontrada"));
                
        Ingresso ingresso = new Ingresso();
        ingresso.setSessao(sessao);
        ingresso.setQuantidade(ingressoDTO.getQuantidade());
        ingresso.setTipoIngresso(ingressoDTO.getTipoIngresso());
        
        // Calcula o valor total baseado no tipo de ingresso
        BigDecimal valorBase = sessao.getValorIngresso().multiply(BigDecimal.valueOf(ingressoDTO.getQuantidade()));
        
        if (ingressoDTO.getTipoIngresso() == Ingresso.TipoIngresso.MEIA) {
            valorBase = valorBase.multiply(BigDecimal.valueOf(0.5));
        }
        
        ingresso.setValorTotal(valorBase);
        
        return ingressoRepository.save(ingresso);
    }
    
    public Optional<Ingresso> atualizar(Long id, IngressoDTO ingressoDTO) {
        return ingressoRepository.findById(id)
                .map(ingressoExistente -> {
                    Sessao sessao = sessaoRepository.findById(ingressoDTO.getSessaoId())
                            .orElseThrow(() -> new EntityNotFoundException("Sessão não encontrada"));
                            
                    ingressoExistente.setSessao(sessao);
                    ingressoExistente.setQuantidade(ingressoDTO.getQuantidade());
                    ingressoExistente.setTipoIngresso(ingressoDTO.getTipoIngresso());
                    
                    // Recalcula o valor total
                    BigDecimal valorBase = sessao.getValorIngresso().multiply(BigDecimal.valueOf(ingressoDTO.getQuantidade()));
                    
                    if (ingressoDTO.getTipoIngresso() == Ingresso.TipoIngresso.MEIA) {
                        valorBase = valorBase.multiply(BigDecimal.valueOf(0.5));
                    }
                    
                    ingressoExistente.setValorTotal(valorBase);
                    
                    return ingressoRepository.save(ingressoExistente);
                });
    }
    
    public void excluir(Long id) {
        ingressoRepository.deleteById(id);
    }
}
