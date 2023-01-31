package br.com.adoteme.model.response;

import br.com.adoteme.model.entity.Cliente;
import lombok.Data;

@Data
public class ClienteResponse {

    private Integer codigo;
    private String nome;
    private String senha;
    private String email;
    private String documento;
    private String telefone;
    private String logradouro;
    private String complemento;
    private String cep;
    private String cidade;
    private Long estado;
    private String bairro;


    public ClienteResponse(Cliente cliente) {
        this.codigo = cliente.getCodigo();
        this.nome = cliente.getNome();
        this.senha = null;
        this.email = cliente.getEmail();
        this.documento = cliente.getDocumento();
        this.telefone = cliente.getTelefone();
        this.logradouro = cliente.getLogradouro();
        this.complemento = cliente.getComplemento();
        this.cep = cliente.getCep();
        this.cidade = cliente.getCidade();
        this.estado = cliente.getEstado().getCodigo();
        this.bairro = cliente.getBairro();
    }
}
