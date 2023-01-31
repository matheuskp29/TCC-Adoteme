package br.com.adoteme.model.response;

import br.com.adoteme.model.entity.Temperamento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TemperamentoResponse {

    private Long id;

    private String nome;

    public TemperamentoResponse(Temperamento temperamento) {
        this.id = temperamento.getIdTemperamento();
        this.nome = temperamento.getNome();
    }
}
