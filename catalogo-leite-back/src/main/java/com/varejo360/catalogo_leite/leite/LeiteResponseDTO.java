package com.varejo360.catalogo_leite.leite;

public record LeiteResponseDTO(Long id, String nome, String codigo) {
    public LeiteResponseDTO(Leite leite){
        this(leite.getId(), leite.getNome(), leite.getCodigo());
    }
}
