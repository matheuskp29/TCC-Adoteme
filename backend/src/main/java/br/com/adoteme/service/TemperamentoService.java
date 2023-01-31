package br.com.adoteme.service;

import br.com.adoteme.model.entity.Temperamento;
import br.com.adoteme.model.response.TemperamentoResponse;
import br.com.adoteme.model.response.TipoAnimalResponse;
import br.com.adoteme.repository.TemperamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemperamentoService {

    private final TemperamentoRepository temperamentoRepository;
    public List<TemperamentoResponse> getTemperamentos() {
        return temperamentoRepository.findAll().stream()
                .map(TemperamentoResponse::new)
                .toList();
    }

}
