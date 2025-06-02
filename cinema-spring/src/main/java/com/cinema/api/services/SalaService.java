package com.cinema.api.services;

import com.cinema.api.dtos.SalaDTO;
import com.cinema.api.models.Sala;
import com.cinema.api.repositories.SalaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaService {
    
    @Autowired
    private SalaRepository salaRepository;
    
    public List<Sala> listarTodas() {
        return salaRepository.findAll();
    }
    
    public Optional<Sala> buscarPorId(Long id) {
        return salaRepository.findById(id);
    }
    
    public Sala salvar(SalaDTO salaDTO) {
        Sala sala = new Sala();
        BeanUtils.copyProperties(salaDTO, sala);
        return salaRepository.save(sala);
    }
    
    public Optional<Sala> atualizar(Long id, SalaDTO salaDTO) {
        return salaRepository.findById(id)
                .map(salaExistente -> {
                    BeanUtils.copyProperties(salaDTO, salaExistente);
                    salaExistente.setId(id);
                    return salaRepository.save(salaExistente);
                });
    }
    
    public void excluir(Long id) {
        salaRepository.deleteById(id);
    }
}
