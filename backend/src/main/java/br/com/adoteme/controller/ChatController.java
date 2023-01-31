package br.com.adoteme.controller;

import br.com.adoteme.model.request.ChatFinalizaRequest;
import br.com.adoteme.model.request.ChatRequest;
import br.com.adoteme.model.request.ChatsRequest;
import br.com.adoteme.model.request.MensagemRequest;
import br.com.adoteme.model.response.ChatAvailabilityResponse;
import br.com.adoteme.model.response.ChatResponse;
import br.com.adoteme.model.response.MensagemResponse;
import br.com.adoteme.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService service;

    @Operation(summary = "Cria uma mensagem")
    @PostMapping
    public ResponseEntity<HttpStatus> criaMensagem(@RequestBody MensagemRequest request) {
        service.criaMensagem(request);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "Retorna lista de mensagens")
    @GetMapping
    public ResponseEntity<List<MensagemResponse>> getMensagens(ChatRequest request) {
        return ResponseEntity.ok(service.getMensagens(request));
    }

    @Operation(summary = "Retorna lista de chats")
    @GetMapping("/chats")
    public ResponseEntity<List<ChatResponse>> getChats(ChatsRequest request) {
        return ResponseEntity.ok(service.getChatList(request));
    }

    @Operation(summary = "Retorna status do chat")
    @PostMapping("/status")
    public ResponseEntity<ChatAvailabilityResponse> getChat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(service.getChat(request));
    }


    @Operation(summary = "Finaliza um chat")
    @PutMapping("/finaliza")
    public ResponseEntity<HttpStatus> finalizaChat(@RequestBody ChatFinalizaRequest request) {
       service.finalizaChat(request);
       return ResponseEntity.ok(HttpStatus.OK);
    }
}
