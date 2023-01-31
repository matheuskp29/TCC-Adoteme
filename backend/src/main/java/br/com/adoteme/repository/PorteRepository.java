package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Porte;
import br.com.adoteme.model.enums.PorteAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PorteRepository extends JpaRepository<Porte, Long> {
    Porte findByNome(String porte);
}
