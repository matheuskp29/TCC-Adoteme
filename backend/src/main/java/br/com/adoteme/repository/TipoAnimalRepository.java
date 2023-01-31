package br.com.adoteme.repository;

import br.com.adoteme.model.entity.TipoAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoAnimalRepository extends JpaRepository<TipoAnimal, Long> {

    TipoAnimal findByNome(String tipoAnimal);
}
