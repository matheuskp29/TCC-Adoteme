package br.com.adoteme.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Cliente")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Codigo")
    private Integer codigo;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Email")
    private String email;

    @Column(name = "Senha")
    private String senha;

    @Column(name = "Documento")
    private String documento;

    @Column(name = "Telefone")
    private String telefone;

    @Column(name = "Logradouro")
    private String logradouro;

    @Column(name = "Complemento")
    private String complemento;

    @Column(name = "Cidade")
    private String cidade;

    @Column(name = "Bairro")
    private String bairro;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdEstado")
    private Estado estado;

    @Column(name = "Cep")
    private String cep;

    @Column(name = "Status")
    private Boolean status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "IdRole")
    private Role role;

}
