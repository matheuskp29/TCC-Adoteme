package br.com.adoteme.service;

import br.com.adoteme.model.response.IdadeResponse;
import br.com.adoteme.repository.IdadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdadeService {

    private final IdadeRepository idadeRepository;
    public List<IdadeResponse> getIdades() {
        return idadeRepository.findAll().stream()
                .map(x -> new IdadeResponse(x.getCodigo(), x.getIdade()))
                .toList();
    }
}
