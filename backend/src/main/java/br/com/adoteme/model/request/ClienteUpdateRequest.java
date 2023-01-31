package br.com.adoteme.model.request;

import lombok.Data;

@Data
public class ClienteUpdateRequest {

    private Integer codigo;

    private String nome;

    private String senha;

    private String telefone;

    private String logradouro;

    private String complemento;

    private String bairro;

    private String cidade;

    private Long estado;

    private String cep;
}
