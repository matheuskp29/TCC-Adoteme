package br.com.adoteme.model.request;

import lombok.Data;

@Data
public class DeleteClienteRequest {

    private Integer codigo;
    private String senha;
}
