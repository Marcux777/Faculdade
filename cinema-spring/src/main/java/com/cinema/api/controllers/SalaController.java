package com.cinema.api.controllers;

import com.cinema.api.dtos.SalaDTO;
import com.cinema.api.models.Sala;
import com.cinema.api.services.SalaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salas")
public class SalaController {
    
    @Autowired
    private SalaService salaService;
    
    @GetMapping
    public ResponseEntity<List<Sala>> listarTodas() {
        return ResponseEntity.ok(salaService.listarTodas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sala> buscarPorId(@PathVariable Long id) {
        return salaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Sala> salvar(@Valid @RequestBody SalaDTO salaDTO) {
        Sala salaSalva = salaService.salvar(salaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(salaSalva);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sala> atualizar(@PathVariable Long id, @Valid @RequestBody SalaDTO salaDTO) {
        return salaService.atualizar(id, salaDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        salaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
