package br.com.adoteme.service;

import br.com.adoteme.model.entity.TipoAnimal;
import br.com.adoteme.model.response.TipoAnimalResponse;
import br.com.adoteme.repository.TipoAnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoAnimalService {

    private final TipoAnimalRepository tipoAnimalRepository;

    public List<TipoAnimalResponse> getTipos() {
        return tipoAnimalRepository.findAll().stream()
                .map(x -> new TipoAnimalResponse(x.getCodigo(), x.getNome()))
                .toList();
    }
}
