package br.com.adoteme.service;

import br.com.adoteme.config.exception.AppErrors;
import br.com.adoteme.config.exception.AppException;
import br.com.adoteme.model.entity.*;
import br.com.adoteme.model.request.AnuncioRequest;
import br.com.adoteme.model.request.CriarAnuncioRequest;
import br.com.adoteme.model.request.UpdateAnuncioRequest;
import br.com.adoteme.model.response.*;
import br.com.adoteme.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnuncioService {

    private final AnuncioRepository repository;
    private final IdadeRepository idadeRepository;
    private final TipoAnimalRepository tipoAnimalRepository;
    private final TemperamentoRepository temperamentoRepository;
    private final ClienteRepository clienteRepository;
    private final PorteRepository porteRepository;

    public AnuncioClienteResponse getAnuncioById(Integer id, Integer idCliente) {

        if (id != null) {
            if (idCliente != null) {
                AnuncioClienteResponse response = repository.findAnuncioById(id, idCliente).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
                response.setMeuAnuncio(idCliente.equals(response.getClienteId()));
                return response;
            }
            Optional<Anuncio> anuncio = Optional.ofNullable(repository.findByCodigo(id).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR)));
            if (anuncio.isPresent()) {
                return AnuncioClienteResponse.builder()
                        .tituloAnuncio(anuncio.get().getTitulo())
                        .descricao(anuncio.get().getDescritivo())
                        .foto(anuncio.get().getImagem())
                        .idTemperamento(anuncio.get().getTemperamento().getIdTemperamento())
                        .temperamentoNome(anuncio.get().getTemperamento().getNome())
                        .idPorte(anuncio.get().getPorte().getIdPorte())
                        .porteNome(anuncio.get().getPorte().getNome())
                        .idTipoAnimal(anuncio.get().getTipoAnimal().getCodigo())
                        .tipoAnimal(anuncio.get().getTipoAnimal().getNome())
                        .idIdade(anuncio.get().getIdade().getCodigo())
                        .idade(anuncio.get().getIdade().getIdade())
                        .clienteId(anuncio.get().getCodigo())
                        .clienteNome(anuncio.get().getCliente().getNome())
                        .clienteTelefone(anuncio.get().getCliente().getTelefone())
                        .meuAnuncio(false)
                        .codigoFavorito(null)
                        .build()
                ;
            }
        }

        return null;
    }

    public void save(CriarAnuncioRequest request, MultipartFile foto) {
        Anuncio anuncio = new Anuncio();
        Idade idade = idadeRepository.findById(request.getIdIdade()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        TipoAnimal tipoAnimal = tipoAnimalRepository.findById(request.getIdTipoAnimal()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Temperamento temperamento = temperamentoRepository.findById(request.getIdTemperamento()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Porte porte = porteRepository.findById(request.getIdPorte()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Cliente cliente = clienteRepository.findByEmail(request.getEmailCliente()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));

        if (foto != null && !validaFoto(Objects.requireNonNull(foto.getOriginalFilename()))) {
            throw AppException.of(AppErrors.UNSUPPORTED_MEDIA_TYPE);
        }

        try {
            anuncio.setTitulo(request.getTitulo());
            anuncio.setDescritivo(request.getDescricao());
            anuncio.setIdade(idade);
            anuncio.setPorte(porte);
            anuncio.setTipoAnimal(tipoAnimal);
            anuncio.setCliente(cliente);
            anuncio.setTemperamento(temperamento);
            if (foto != null) {
                anuncio.setImagem(foto.getBytes());
            }
            anuncio.setFlagAtivo(true);
            repository.save(anuncio);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Boolean validaFoto(String nomeArquivo) {
        String[] extensaoArquivo = nomeArquivo.split("\\.");
        return extensaoArquivo[extensaoArquivo.length - 1].contains("jpg")
                || extensaoArquivo[extensaoArquivo.length - 1].contains("jpeg")
                || extensaoArquivo[extensaoArquivo.length - 1].contains("png");
    }

    public List<AnuncioResponse> getAnuncios(AnuncioRequest request) {
        return repository.findAnunciosByFilter(request);
    }

    public void delete(Integer id) {
        Optional<Anuncio> anuncio = repository.findById(id);
        if (anuncio.isPresent()) {
            anuncio.get().setFlagAtivo(false);
            repository.save(anuncio.get());
        } else {
            throw AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR);
        }
    }

    public void update(Integer id, UpdateAnuncioRequest request, MultipartFile foto) throws IOException {
        Anuncio anuncio = repository.findById(id).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Idade idade = idadeRepository.findById(request.getIdIdade()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        TipoAnimal tipoAnimal = tipoAnimalRepository.findById(request.getIdTipoAnimal()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Temperamento temperamento = temperamentoRepository.findById(request.getIdTemperamento()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Porte porte = porteRepository.findById(request.getIdPorte()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));

        anuncio.setTitulo(request.getTitulo());
        anuncio.setIdade(idade);
        anuncio.setDescritivo(request.getDescritivo());
        anuncio.setPorte(porte);
        anuncio.setTemperamento(temperamento);
        anuncio.setTipoAnimal(tipoAnimal);
        if (foto != null && foto.getOriginalFilename() != null) {
            if (validaFoto(foto.getOriginalFilename())) {
                anuncio.setImagem(foto.getBytes());
            }
        }

        repository.save(anuncio);
    }
}
