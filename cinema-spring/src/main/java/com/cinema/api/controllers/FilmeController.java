package com.cinema.api.controllers;

import com.cinema.api.dtos.FilmeDTO;
import com.cinema.api.models.Filme;
import com.cinema.api.services.FilmeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filmes")
public class FilmeController {
    
    @Autowired
    private FilmeService filmeService;
    
    @GetMapping
    public ResponseEntity<List<Filme>> listarTodos() {
        return ResponseEntity.ok(filmeService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Long id) {
        return filmeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Filme> salvar(@Valid @RequestBody FilmeDTO filmeDTO) {
        Filme filmeSalvo = filmeService.salvar(filmeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(filmeSalvo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@PathVariable Long id, @Valid @RequestBody FilmeDTO filmeDTO) {
        return filmeService.atualizar(id, filmeDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        filmeService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
