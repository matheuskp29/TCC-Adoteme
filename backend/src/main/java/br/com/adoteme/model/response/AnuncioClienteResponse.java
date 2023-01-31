package br.com.adoteme.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AnuncioClienteResponse {
    private String tituloAnuncio;

    private String descricao;

    private byte[] foto;

    private Boolean meuAnuncio;

    private Long idTemperamento;

    private String temperamentoNome;

    private Long idPorte;

    private String porteNome;

    private Long idTipoAnimal;

    private String tipoAnimal;

    private Long idIdade;

    private String idade;

    private Integer clienteId;

    private String clienteNome;

    private String clienteTelefone;

    private Integer codigoFavorito;

    public AnuncioClienteResponse(String tituloAnuncio, String descricao, byte[] foto, Long idTemperamento, String temperamentoNome, Long idPorte, String porteNome, Long idTipoAnimal, String tipoAnimal, Long idIdade, String idade, Integer clienteId, String clienteNome, String clienteTelefone, Integer codigoFavorito) {
        this.tituloAnuncio = tituloAnuncio;
        this.descricao = descricao;
        this.foto = foto;
        this.idTemperamento = idTemperamento;
        this.temperamentoNome = temperamentoNome;
        this.idPorte = idPorte;
        this.porteNome = porteNome;
        this.idTipoAnimal = idTipoAnimal;
        this.tipoAnimal = tipoAnimal;
        this.idIdade = idIdade;
        this.idade = idade;
        this.clienteId = clienteId;
        this.clienteNome = clienteNome;
        this.clienteTelefone = clienteTelefone;
        this.codigoFavorito = codigoFavorito;
    }
}
