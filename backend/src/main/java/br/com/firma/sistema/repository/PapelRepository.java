package br.com.firma.sistema.repository;

import br.com.firma.sistema.arq.EntidadeNaoEncontrada;
import br.com.firma.sistema.dto.Papel;
import br.com.firma.sistema.dto.Usuario;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class PapelRepository {
    private static final Set<Papel> papeis = new HashSet<>();

    public PapelRepository() {
        if (papeis.size() == 0) {
            papeis.add(new Papel(1L, "Comum"));
            papeis.add(new Papel(2L, "Moderador"));
            papeis.add(new Papel(3L, "Admin"));
        }
    }

    public Set<Papel> todos() {
        return papeis;
    }

    public Papel porId(Long id) {
        for (Papel papel : papeis) {
            if (Objects.equals(papel.getId(), id)) {
                return papel;
            }
        }
        throw new EntidadeNaoEncontrada("papel", id);
    }

    public void remover(Long id) {
        if (!papeis.removeIf(papel -> Objects.equals(papel.getId(), id))) {
            throw new EntidadeNaoEncontrada("papel", id);
        }
    }

    public void atualizar(@PathVariable Long id, Papel papel) {
        papel.setId(id);
        if (!papeis.removeIf(p -> Objects.equals(p.getId(), papel.getId()))) {
            throw new EntidadeNaoEncontrada("papel", papel.getId());
        }

        papeis.add(papel);
    }

    public void adicionar(Papel papel) {
        papel.setId(proximoId());
        papeis.add(papel);
    }

    private long proximoId() {
        long maiorId = 0L;
        for (Papel papel : papeis) {
            maiorId = Math.max(papel.getId(), maiorId);
        }
        return maiorId + 1;
    }
}
