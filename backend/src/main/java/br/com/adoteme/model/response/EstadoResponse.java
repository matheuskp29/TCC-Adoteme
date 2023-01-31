package br.com.adoteme.model.response;

import br.com.adoteme.model.entity.Estado;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EstadoResponse {

    private Long id;

    private String nome;

    public EstadoResponse(Estado estado) {
        this.id = estado.getCodigo();
        this.nome = estado.getNome();
    }
}
