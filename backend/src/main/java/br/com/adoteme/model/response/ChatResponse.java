package br.com.adoteme.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChatResponse {

    private Integer codigoAnuncio;

    private String tituloAnuncio;

    private Integer codigoClienteAutenticado;

    private Integer codigoClienteDestino;

    private String nomeClienteAnuncio;

    private String nomeClienteInteressado;

    private Integer codigoChat;

    private Boolean status;

    private byte[] fotoAnuncio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatResponse that = (ChatResponse) o;

        boolean anuncio = Objects.equals(codigoAnuncio, that.codigoAnuncio);
        boolean clientes = (Objects.equals(codigoClienteAutenticado, that.codigoClienteAutenticado) || Objects.equals(codigoClienteAutenticado, that.codigoClienteDestino))
                        && (Objects.equals(codigoClienteDestino, that.codigoClienteDestino) || Objects.equals(codigoClienteDestino, that.codigoClienteAutenticado));

        return anuncio && clientes;
    }
}
