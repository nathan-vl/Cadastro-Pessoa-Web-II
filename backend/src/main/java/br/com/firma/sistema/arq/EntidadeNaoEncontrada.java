package br.com.firma.sistema.arq;

public class EntidadeNaoEncontrada extends RuntimeException {
    public EntidadeNaoEncontrada(String nome, Long id) {
        super("Não foi possível obter " + nome.toLowerCase() + " com id " + id + ".");
    }
}
