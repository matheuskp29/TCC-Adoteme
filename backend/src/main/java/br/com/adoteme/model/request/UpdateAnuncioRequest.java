package br.com.adoteme.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateAnuncioRequest {

    @NotNull
    private String titulo;

    @NotNull
    private String descritivo;

    @NotNull
    private Long idTipoAnimal;

    @NotNull
    private Long idIdade;

    @NotNull
    private Long idPorte;

    @NotNull
    private Long idTemperamento;
}
