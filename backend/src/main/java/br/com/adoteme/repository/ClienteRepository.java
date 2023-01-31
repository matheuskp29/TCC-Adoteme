package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query("FROM Cliente c WHERE c.email = ?1 AND c.senha = ?2 AND c.status = ?3")
    Optional<Cliente> findClienteByEmailAndSenhaAndStatus(String email, String senha, Boolean status);

    @Query("FROM Cliente c WHERE c.email = ?1 AND c.status = true")
    Optional<Cliente> findByEmail(String email);

    long countByStatus(Boolean status);
}
