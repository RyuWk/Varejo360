package com.varejo360.catalogo_leite.leite;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "leites")
@Entity(name = "leites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Leite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) //id para o BD. Usar o UUID seria mais robusto, talvez
    private Long id;

    @Column(nullable = false) //nome nao pode ser vazio
    private String nome;

    @Column(unique = true, nullable = false) //nem cod, e ele é unico pra cada
    private String codigo;

    public Leite(LeiteRequestDTO data){
        this.codigo = data.codigo();
        this.nome = data.nome();
    }


}
