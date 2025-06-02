package com.cinema.api.controllers;

import com.cinema.api.dtos.SessaoDTO;
import com.cinema.api.models.Sessao;
import com.cinema.api.services.SessaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessoes")
public class SessaoController {
    
    @Autowired
    private SessaoService sessaoService;
    
    @GetMapping
    public ResponseEntity<List<Sessao>> listarTodas() {
        return ResponseEntity.ok(sessaoService.listarTodas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Long id) {
        return sessaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Sessao> salvar(@Valid @RequestBody SessaoDTO sessaoDTO) {
        Sessao sessaoSalva = sessaoService.salvar(sessaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(sessaoSalva);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sessao> atualizar(@PathVariable Long id, @Valid @RequestBody SessaoDTO sessaoDTO) {
        return sessaoService.atualizar(id, sessaoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        sessaoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
