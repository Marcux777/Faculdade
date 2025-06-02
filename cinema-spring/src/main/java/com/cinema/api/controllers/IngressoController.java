package com.cinema.api.controllers;

import com.cinema.api.dtos.IngressoDTO;
import com.cinema.api.models.Ingresso;
import com.cinema.api.services.IngressoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingressos")
public class IngressoController {
    
    @Autowired
    private IngressoService ingressoService;
    
    @GetMapping
    public ResponseEntity<List<Ingresso>> listarTodos() {
        return ResponseEntity.ok(ingressoService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Ingresso> buscarPorId(@PathVariable Long id) {
        return ingressoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Ingresso> salvar(@Valid @RequestBody IngressoDTO ingressoDTO) {
        Ingresso ingressoSalvo = ingressoService.salvar(ingressoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ingressoSalvo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Ingresso> atualizar(@PathVariable Long id, @Valid @RequestBody IngressoDTO ingressoDTO) {
        return ingressoService.atualizar(id, ingressoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        ingressoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
