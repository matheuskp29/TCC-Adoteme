package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Idade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdadeRepository extends JpaRepository<Idade, Long> {
    Idade findByIdade(String idade);
}
