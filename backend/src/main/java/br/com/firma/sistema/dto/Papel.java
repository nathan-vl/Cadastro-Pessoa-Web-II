package br.com.firma.sistema.dto;

import br.com.firma.sistema.arq.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

public class Papel extends Entity {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String descricao;

    public Papel(Long id, String descricao) {
        super();
        this.id = id;
        this.descricao = descricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Papel papel = (Papel) o;
        return Objects.equals(id, papel.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
