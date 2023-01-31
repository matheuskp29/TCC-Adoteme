package br.com.adoteme.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AnuncioResponse {

    private Integer id;

    private String titulo;

    private String idade;

    private String tipoAnimal;

    private String porte;

    private String temperamento;

    private byte[] foto;

    private Integer codigoFavorito;

    private Integer codigoDonoAnuncio;
}
