package br.com.firma.sistema.arq;

import lombok.Getter;

import java.util.Date;

public abstract class Entity {
    @Getter
    private final Date criadoEm;

    public Entity() {
        this.criadoEm = new Date();
    }

    public abstract Long getId();

    public abstract void setId(Long id);
}
