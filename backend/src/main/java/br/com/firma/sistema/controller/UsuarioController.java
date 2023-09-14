package br.com.firma.sistema.controller;

import br.com.firma.sistema.arq.EntidadeNaoEncontrada;
import br.com.firma.sistema.dto.Usuario;
import br.com.firma.sistema.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class UsuarioController {
    UsuarioRepository usuarioRepository;

    public UsuarioController() {
        this.usuarioRepository = new UsuarioRepository();
    }

    @GetMapping
    public Set<Usuario> todos() {
        return usuarioRepository.todos();
    }

    @GetMapping("/{id}")
    public Usuario porId(@PathVariable Long id) {
        try {
            return usuarioRepository.porId(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com id " + id + " não encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        try {
            usuarioRepository.remover(id);
        } catch (EntidadeNaoEncontrada e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public void adicionar(@RequestBody Usuario usuario) {
        usuarioRepository.adicionar(usuario);
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuarioRepository.atualizar(id, usuario);
    }
}
