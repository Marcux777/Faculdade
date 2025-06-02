package com.cinema.api.services;

import com.cinema.api.dtos.FilmeDTO;
import com.cinema.api.models.Filme;
import com.cinema.api.repositories.FilmeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {
    
    @Autowired
    private FilmeRepository filmeRepository;
    
    public List<Filme> listarTodos() {
        return filmeRepository.findAll();
    }
    
    public Optional<Filme> buscarPorId(Long id) {
        return filmeRepository.findById(id);
    }
    
    public Filme salvar(FilmeDTO filmeDTO) {
        Filme filme = new Filme();
        BeanUtils.copyProperties(filmeDTO, filme);
        return filmeRepository.save(filme);
    }
    
    public Optional<Filme> atualizar(Long id, FilmeDTO filmeDTO) {
        return filmeRepository.findById(id)
                .map(filmeExistente -> {
                    BeanUtils.copyProperties(filmeDTO, filmeExistente);
                    filmeExistente.setId(id);
                    return filmeRepository.save(filmeExistente);
                });
    }
    
    public void excluir(Long id) {
        filmeRepository.deleteById(id);
    }
}
