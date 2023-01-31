package br.com.adoteme.service;

import br.com.adoteme.model.response.EstadoResponse;
import br.com.adoteme.repository.EstadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EstadoService {

    private final EstadoRepository repository;

    public List<EstadoResponse> findAll() {
        return repository.findAll().stream()
                .filter(estado -> !Objects.equals(estado.getNome(), "Usuário desativado"))
                .map(EstadoResponse::new)
                .toList()
        ;
    }
}
