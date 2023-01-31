package br.com.adoteme.service;

import br.com.adoteme.config.exception.AppErrors;
import br.com.adoteme.config.exception.AppException;
import br.com.adoteme.model.dto.MensagemDTO;
import br.com.adoteme.model.entity.Anuncio;
import br.com.adoteme.model.entity.Chat;
import br.com.adoteme.model.entity.Cliente;
import br.com.adoteme.model.entity.Mensagem;
import br.com.adoteme.model.request.ChatFinalizaRequest;
import br.com.adoteme.model.request.ChatRequest;
import br.com.adoteme.model.request.ChatsRequest;
import br.com.adoteme.model.request.MensagemRequest;
import br.com.adoteme.model.response.ChatAvailabilityResponse;
import br.com.adoteme.model.response.ChatResponse;
import br.com.adoteme.model.response.MensagemResponse;
import br.com.adoteme.repository.AnuncioRepository;
import br.com.adoteme.repository.ChatRepository;
import br.com.adoteme.repository.ClienteRepository;
import br.com.adoteme.repository.MensagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final MensagemRepository repository;

    private final AnuncioRepository anuncioRepository;

    private final ClienteRepository clienteRepository;

    private final ChatRepository chatRepository;

    public List<ChatResponse> getChatList(ChatsRequest request) {
        List<ChatResponse> chats = repository.findByCodigoCliente(request.getCodigoCliente());
        List<ChatResponse> filteredChats = new ArrayList<>();
        for (ChatResponse chat : chats) {
            Integer codigoClienteDestino = getCodigoClienteDestino(request.getCodigoCliente(), chat.getCodigoClienteAutenticado(), chat.getCodigoClienteDestino());
            chat.setCodigoClienteAutenticado(request.getCodigoCliente());
            chat.setCodigoClienteDestino(codigoClienteDestino);
            if (!filteredChats.contains(chat)) {
                filteredChats.add(chat);
            }
        }
        return filteredChats;
    }

    private Integer getCodigoClienteDestino(Integer codigoClienteRequest, Integer codigoClienteAutenticado, Integer codigoClienteDestino) {
        if (codigoClienteRequest.equals(codigoClienteAutenticado)) return codigoClienteDestino;
        return codigoClienteAutenticado;
    }

    public ChatAvailabilityResponse getChat(ChatRequest request) {
        Optional<Chat> chat = chatRepository.findChatByClienteAndAnuncio(request.getCodigoClienteAutenticado(), request.getCodigoAnuncio());
        ChatAvailabilityResponse chatResponse = new ChatAvailabilityResponse();
        if (chat.isPresent()) {
            chatResponse.setCodigo(chat.get().getCodigo());
            chatResponse.setStatus(chat.get().getStatus());
        }
        return chatResponse;
    }

    public void criaMensagem(MensagemRequest request) {
        Anuncio anuncio = anuncioRepository.findById(request.getCodigoAnuncio()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));
        Cliente cliente = clienteRepository.findById(request.getCodigoCliente()).orElseThrow(() -> AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR));

        if (Objects.equals(anuncio.getCliente().getCodigo(), cliente.getCodigo())) {
            Optional<Chat> chatInteressado = chatRepository.findChatByClienteAndAnuncio(request.getCodigoClienteDestino(), anuncio.getCodigo());

            if (chatInteressado.isPresent()) {
                if (!chatInteressado.get().getStatus()) {
                    throw AppException.of(AppErrors.BAD_REQUEST_ERROR);
                }
                repository.save(Mensagem.builder()
                        .cliente(cliente)
                        .anuncio(anuncio)
                        .chat(chatInteressado.get())
                        .descricao(request.getDescricao())
                        .dataHora(LocalDateTime.now())
                        .build())
                ;
            }
        } else {
            Chat chat = this.criaChat(anuncio, cliente);
            repository.save(Mensagem.builder()
                    .cliente(cliente)
                    .anuncio(anuncio)
                    .chat(chat)
                    .descricao(request.getDescricao())
                    .dataHora(LocalDateTime.now())
                    .build())
            ;
        }
    }

    public Chat criaChat(Anuncio anuncio, Cliente cliente) {
        Optional<Chat> chatExistente = chatRepository.findChatByClienteAndAnuncio(cliente.getCodigo(), anuncio.getCodigo());
        if (chatExistente.isEmpty()) {
            return chatRepository.save(Chat.builder()
                    .anuncio(anuncio)
                    .cliente(cliente)
                    .status(true)
                    .build())
                    ;
        } else {
            if (!chatExistente.get().getStatus()) {
                throw AppException.of(AppErrors.BAD_REQUEST_ERROR);
            }
            return chatExistente.get();
        }
    }

    public List<MensagemResponse> getMensagens(ChatRequest request) {
        List<MensagemDTO> mensagens = repository.findByAnuncioAndClienteAutenticadoAndClienteDestino(request.getCodigoAnuncio(),
                request.getCodigoClienteAutenticado(), request.getCodigoClienteDestino());

        return mensagens.stream().map(mensagem ->
                        new MensagemResponse(
                                mensagem.getDescricao(),
                                getLadoDireito(request.getCodigoClienteAutenticado(), mensagem.getCodigoCliente()))
                ).collect(Collectors.toList());
    }

    private Boolean getLadoDireito(Integer codigoClienteAutenticado, Integer codigoClienteOrigemMensagem) {
        return codigoClienteAutenticado.equals(codigoClienteOrigemMensagem);
    }

    public void finalizaChat(ChatFinalizaRequest request) {
        Optional<Chat> chat = chatRepository.findById(request.getCodigoChat());
        chat.ifPresentOrElse((x) -> {
            x.setStatus(false);
            chatRepository.save(x);
        }, () -> {
            throw AppException.of(AppErrors.ENTITY_NOT_FOUND_ERROR);
        });
    }
}
