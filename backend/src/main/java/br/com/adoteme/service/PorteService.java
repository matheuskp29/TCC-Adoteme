package br.com.adoteme.service;

import br.com.adoteme.model.entity.Porte;
import br.com.adoteme.model.response.PorteResponse;
import br.com.adoteme.repository.PorteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PorteService {

    private final PorteRepository porteRepository;

    public List<PorteResponse> getPortes() {
       return porteRepository.findAll().stream()
               .map(x -> new PorteResponse(x.getIdPorte(), x.getNome()))
               .toList();

    }
}
