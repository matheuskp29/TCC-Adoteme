package br.com.adoteme.service;

import br.com.adoteme.model.response.RelatorioResponse;
import br.com.adoteme.repository.AnuncioRepository;
import br.com.adoteme.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RelatorioService {

    private final AnuncioRepository anuncioRepository;

    private final ClienteRepository clienteRepository;

    public RelatorioResponse getRelatorio() {
        return RelatorioResponse.builder()
                .quantidadeAnuncios(anuncioRepository.count())
                .quantidadeUsuarios(clienteRepository.count())
                .quantidadeAnunciosAtivos(anuncioRepository.countByFlagAtivo(true))
                .quantidadeUsuariosAtivos(clienteRepository.countByStatus(true))
                .quantidadeAnunciosCachorro(anuncioRepository.countByTipoAnimalNomeAndFlagAtivo("Cachorro", true))
                .quantidadeAnunciosGato(anuncioRepository.countByTipoAnimalNomeAndFlagAtivo("Gato", true))
                .quantidadeAnunciosPassaro(anuncioRepository.countByTipoAnimalNomeAndFlagAtivo("Passáro", true))
                .quantidadeAnunciosTartaruga(anuncioRepository.countByTipoAnimalNomeAndFlagAtivo("Tartaruga", true))
                .build();
    }
}
