package br.com.firma.sistema.dto;

import br.com.firma.sistema.arq.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

public class Usuario extends Entity {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String nome;

    @Getter
    @Setter
    private Set<Papel> papeis;

    public Usuario(Long id, String nome, Set<Papel> papeis) {
        super();
        this.id = id;
        this.nome = nome;
        this.papeis = papeis;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
