package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query(value = "FROM Chat c WHERE c.cliente.codigo = ?1 AND c.anuncio.codigo = ?2")
    Optional<Chat> findChatByClienteAndAnuncio(Integer codigoCliente, Integer codigoAnuncio);
}
