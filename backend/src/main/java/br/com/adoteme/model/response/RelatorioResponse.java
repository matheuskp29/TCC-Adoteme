package br.com.adoteme.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RelatorioResponse {

    private long quantidadeAnuncios;

    private long quantidadeUsuarios;

    private long quantidadeAnunciosAtivos;

    private long quantidadeUsuariosAtivos;

    private long quantidadeAnunciosCachorro;

    private long quantidadeAnunciosGato;

    private long quantidadeAnunciosPassaro;

    private long quantidadeAnunciosTartaruga;
}
