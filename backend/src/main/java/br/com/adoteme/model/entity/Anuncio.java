package br.com.adoteme.model.entity;

import br.com.adoteme.model.enums.PorteAnimal;
import br.com.adoteme.model.enums.TipoTemperamento;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Anuncio")
@Getter
@Setter
public class Anuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Codigo")
    private Integer codigo;

    @Column(name = "Titulo")
    private String titulo;

    @Column(name = "Descritivo")
    private String descritivo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdCliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idTipoAnimal")
    private TipoAnimal tipoAnimal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idIdade")
    private Idade idade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdPorte")
    private Porte porte;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdTemperamento")
    private Temperamento temperamento;

    @Column(name = "Imagem")
    private byte[] imagem;

    @Column(name = "FlagAtivo")
    private Boolean flagAtivo;
}
