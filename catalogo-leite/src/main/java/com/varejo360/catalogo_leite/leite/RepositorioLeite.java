package com.varejo360.catalogo_leite.leite;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioLeite extends JpaRepository<Leite, Long> {
    //a pesquisa deve achar pelo cod OU pelo nome
    Page<Leite> findByCodigoStartingWithIgnoreCaseOrNomeContainingIgnoreCase(String codigo, String nome, Pageable pageable);
}
