package br.com.adoteme.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnuncioRequest {

    private Integer idCliente;

    @NotNull
    private Boolean meusAnuncios;

    @NotNull
    private Boolean favoritos;

    private Long tipoAnimal;

    private Long porte;

    private Long temperamento;

    private Long estado;

    private Long idade;
}
