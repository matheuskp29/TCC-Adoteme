package br.com.adoteme.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FavoritoRequest {

    private Integer codigoCliente;

    private Integer codigoAnuncio;
}
