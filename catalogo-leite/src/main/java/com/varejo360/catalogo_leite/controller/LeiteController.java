package com.varejo360.catalogo_leite.controller;

import com.varejo360.catalogo_leite.leite.Leite;
import com.varejo360.catalogo_leite.leite.LeiteRequestDTO;
import com.varejo360.catalogo_leite.leite.LeiteResponseDTO;
import com.varejo360.catalogo_leite.leite.RepositorioLeite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("leite")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LeiteController {

    @Autowired
    private RepositorioLeite repository;

    @PostMapping
    public ResponseEntity<LeiteResponseDTO> saveLeite(@RequestBody LeiteRequestDTO data){
        Leite dataLeite = new Leite(data);
        Leite salvo = repository.save(dataLeite);
        return ResponseEntity.ok(new LeiteResponseDTO(salvo));
    }

    @GetMapping
    public ResponseEntity<Page<LeiteResponseDTO>> getAll(
            @RequestParam(required = false, defaultValue = "") String filtro,
            @PageableDefault(size = 9) Pageable pageable //exige 9 itens por tabela
    ){
        Page<Leite> leitesPage;

        if (filtro.isBlank()) {
            leitesPage = repository.findAll(pageable); //filtro vazio = mostra tudo
        } else {
            leitesPage = repository.findByCodigoStartingWithIgnoreCaseOrNomeContainingIgnoreCase(
                    filtro, filtro, pageable
            );
        }

        //converte a página de Entidades para uma página de DTO
        Page<LeiteResponseDTO> response = leitesPage.map(LeiteResponseDTO::new);
        return ResponseEntity.ok(response);
    }

    // Botão de exclusão da tabela
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeite(@PathVariable Long id){
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}