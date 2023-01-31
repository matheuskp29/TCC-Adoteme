package br.com.adoteme.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Chat")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Codigo")
    private Integer codigo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CodigoAnuncio")
    @ToString.Exclude
    private Anuncio anuncio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CodigoCliente")
    @ToString.Exclude
    private Cliente cliente;

    @Column(name = "Status")
    private Boolean status;

    public Chat(Anuncio anuncio, Cliente cliente) {
        this.anuncio = anuncio;
        this.cliente = cliente;
    }
}
