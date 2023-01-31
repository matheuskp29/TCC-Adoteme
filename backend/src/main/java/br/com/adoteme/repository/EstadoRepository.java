package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoRepository extends JpaRepository<Estado, Long> {

    Estado findByNome(String nome);
}
