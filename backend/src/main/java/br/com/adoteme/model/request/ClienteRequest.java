package br.com.adoteme.model.request;

import lombok.Data;

@Data
public class ClienteRequest {

    private String nome;

    private String email;

    private String senha;

    private String documento;

    private String telefone;

    private String logradouro;

    private String complemento;

    private String bairro;

    private String cidade;

    private Long estado;

    private String cep;
}
