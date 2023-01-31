package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Integer> {

    @Query("FROM Favorito f WHERE f.cliente.codigo = ?1 AND f.anuncio.codigo = ?2")
    Optional<Favorito> findByClienteAndAnuncio(Integer codigoCliente, Integer codigoAnuncio);
}
