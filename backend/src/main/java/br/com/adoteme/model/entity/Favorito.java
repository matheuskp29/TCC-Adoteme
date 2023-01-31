package br.com.adoteme.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Favorito")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Codigo")
    private Integer codigo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CodigoAnuncio")
    private Anuncio anuncio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CodigoCliente")
    private Cliente cliente;
}
