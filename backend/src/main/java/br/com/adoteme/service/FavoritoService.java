package br.com.adoteme.service;

import br.com.adoteme.config.exception.AppErrors;
import br.com.adoteme.config.exception.AppException;
import br.com.adoteme.model.entity.Anuncio;
import br.com.adoteme.model.entity.Cliente;
import br.com.adoteme.model.entity.Favorito;
import br.com.adoteme.model.request.FavoritoRequest;
import br.com.adoteme.repository.AnuncioRepository;
import br.com.adoteme.repository.ClienteRepository;
import br.com.adoteme.repository.FavoritoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoritoService {

    private final ClienteRepository clienteRepository;

    private final AnuncioRepository anuncioRepository;

    private final FavoritoRepository repository;

    public void favoritarAnuncio(FavoritoRequest request) {
        Cliente cliente = clienteRepository.findById(request.getCodigoCliente()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Anuncio anuncio = anuncioRepository.findById(request.getCodigoAnuncio()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));

        Optional<Favorito> favorito = repository.findByClienteAndAnuncio(cliente.getCodigo(), anuncio.getCodigo());

        if (favorito.isPresent()) {
            repository.delete(favorito.get());
        } else {
            repository.save(Favorito.builder().cliente(cliente).anuncio(anuncio).build());
        }
    }
}
