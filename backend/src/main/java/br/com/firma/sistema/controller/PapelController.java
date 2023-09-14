package br.com.firma.sistema.controller;

import br.com.firma.sistema.arq.EntidadeNaoEncontrada;
import br.com.firma.sistema.dto.Papel;
import br.com.firma.sistema.repository.PapelRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
@RequestMapping("/papel")
@CrossOrigin
public class PapelController {
    PapelRepository papelRepository;

    public PapelController() {
        this.papelRepository = new PapelRepository();
    }

    @GetMapping
    public Set<Papel> todos() {
        return papelRepository.todos();
    }

    @GetMapping("/{id}")
    public Papel porId(@PathVariable Long id) {
        try {
            return papelRepository.porId(id);
        } catch (EntidadeNaoEncontrada e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        try {
            papelRepository.remover(id);
        } catch (EntidadeNaoEncontrada e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public void adicionar(@RequestBody Papel papel) {
        papelRepository.adicionar(papel);
    }

    @PutMapping("/{id}")
    public void atualizar(@PathVariable Long id, @RequestBody Papel papel) {
        papelRepository.atualizar(id, papel);
    }
}
