package br.com.adoteme.repository;

import br.com.adoteme.model.entity.Temperamento;
import br.com.adoteme.model.enums.TipoTemperamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperamentoRepository extends JpaRepository<Temperamento, Long> {
    Temperamento findByNome(String temperamento);
}
