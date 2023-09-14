package br.com.firma.sistema.repository;

import br.com.firma.sistema.arq.EntidadeNaoEncontrada;
import br.com.firma.sistema.dto.Papel;
import br.com.firma.sistema.dto.Usuario;

import java.util.*;

public class UsuarioRepository {
    private static final Set<Usuario> usuarios = new HashSet<>();

    public UsuarioRepository() {
        if (usuarios.size() == 0) {
            PapelRepository papelRepository = new PapelRepository();

            usuarios.add(new Usuario(1L, "Huguinho", new HashSet<>(List.of(new Papel[]{papelRepository.porId(1L)}))));
            usuarios.add(new Usuario(2L, "Zezinho", new HashSet<>(List.of(new Papel[]{papelRepository.porId(3L)}))));
            usuarios.add(new Usuario(3L, "Luisinho", new HashSet<>(List.of(new Papel[]{papelRepository.porId(2L)}))));
        }
    }

    public Set<Usuario> todos() {
        return usuarios;
    }

    public Usuario porId(Long id) {
        for (Usuario usuario : usuarios) {
            if (Objects.equals(usuario.getId(), id)) {
                return usuario;
            }
        }
        throw new EntidadeNaoEncontrada("usuário", id);
    }

    public void remover(Long id) {
        if (!usuarios.removeIf(usuario -> Objects.equals(usuario.getId(), id))) {
            throw new EntidadeNaoEncontrada("usuário", id);
        }
    }

    public void atualizar(Long id, Usuario usuario) {
        usuario.setId(id);
        if (!usuarios.removeIf(u -> Objects.equals(u.getId(), usuario.getId()))) {
            throw new EntidadeNaoEncontrada("usuário", usuario.getId());
        }

        PapelRepository papelRepository = new PapelRepository();
        for (Papel papel : usuario.getPapeis()) {
            papelRepository.porId(papel.getId());
        }

        usuarios.add(usuario);
    }

    public void adicionar(Usuario usuario) {
        PapelRepository papelRepository = new PapelRepository();
        for (Papel papel : usuario.getPapeis()) {
            papelRepository.porId(papel.getId());
        }

        usuario.setId(proximoId());
        usuarios.add(usuario);
    }

    private long proximoId() {
        long maiorId = 0L;
        for (Usuario usuario : usuarios) {
            maiorId = Math.max(usuario.getId(), maiorId);
        }
        return maiorId + 1;
    }
}
