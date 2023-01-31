package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Anuncio;
import br.com.adoteme.model.response.AnuncioClienteResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio, Integer>, AnuncioRepositoryCustom {

    @Query(value = "SELECT NEW Anuncio(a.codigo, a.titulo, a.descritivo, a.cliente, " +
            "a.tipoAnimal, a.idade, a.porte, a.temperamento, a.imagem, a.flagAtivo) " +
            "FROM Anuncio a " +
            "LEFT JOIN a.tipoAnimal ta ON ta.codigo = a.tipoAnimal " +
            "LEFT JOIN a.porte p ON p.idPorte = a.porte " +
            "LEFT JOIN a.idade i ON i.codigo = a.idade " +
            "LEFT JOIN a.temperamento te ON te.idTemperamento = a.temperamento " +
            "LEFT JOIN a.cliente c ON c.codigo = a.cliente " +
            "LEFT JOIN c.estado e ON e.codigo = c.estado " +
            "WHERE (ta.nome = ?1 OR ?1 IS NULL) " +
            "AND (p.nome = ?2 OR ?2 IS NULL) " +
            "AND (te.nome = ?3 OR ?3 IS NULL) " +
            "AND (e.nome = ?4 OR ?4 IS NULL)" +
            "AND (i.idade = ?5 OR ?5 IS NULL)")
    List<Anuncio> getAnunciosFiltrado(
            @Param(value = "tipoAnimal") String tipoAnimal, @Param(value = "porte") String porte,
            @Param(value = "temperamento") String temperamento, @Param(value = "estado") String estado,
            @Param(value = "idade") String idade);

    @Query("SELECT new br.com.adoteme.model.response.AnuncioClienteResponse(a.titulo, a.descritivo, a.imagem, " +
            "a.temperamento.idTemperamento, a.temperamento.nome, a.porte.idPorte, a.porte.nome, a.tipoAnimal.codigo, " +
            "a.tipoAnimal.nome, a.idade.codigo, a.idade.idade, a.cliente.codigo, a.cliente.nome, a.cliente.telefone, " +
            "f.codigo) " +
            "FROM Anuncio a " +
            "LEFT JOIN Favorito f ON a.codigo = f.anuncio.codigo AND ?2 = f.cliente.codigo " +
            "WHERE a.codigo = ?1")
    Optional<AnuncioClienteResponse> findAnuncioById(Integer id, Integer idCliente);

    Optional<Anuncio> findByCodigo(Integer codigo);

    long countByFlagAtivo(Boolean flagAtivo);

    long countByTipoAnimalNomeAndFlagAtivo(String nome, Boolean flagAtivo);
}
