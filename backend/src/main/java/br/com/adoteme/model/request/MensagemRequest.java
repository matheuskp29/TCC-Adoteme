package br.com.adoteme.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MensagemRequest {

    private Integer codigoCliente;

    private Integer codigoClienteDestino;

    private Integer codigoAnuncio;

    private String descricao;
}
