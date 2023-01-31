package br.com.adoteme.controller;

import br.com.adoteme.model.request.ClienteRequest;
import br.com.adoteme.model.request.ClienteUpdateRequest;
import br.com.adoteme.model.request.DeleteClienteRequest;
import br.com.adoteme.model.request.LoginRequest;
import br.com.adoteme.model.response.ClienteResponse;
import br.com.adoteme.model.response.LoginResponse;
import br.com.adoteme.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/cliente")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Cliente", description = "Endpoints Cliente")
public class ClienteController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClienteController.class);
    private final ClienteService service;

    @Operation(summary = "Criação de cliente")
    @PostMapping
    public ResponseEntity<Void> createCliente(@RequestBody ClienteRequest request) {
        service.createCliente(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Autenticação de usuário")
    @PostMapping("/autenticar")
    public ResponseEntity<LoginResponse> autenticarCliente(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(service.autenticarCliente(loginRequest));
    }

    @Operation(summary = "Atualiza um cliente")
    @PutMapping
    public ResponseEntity<ClienteResponse> updateCliente(@RequestBody ClienteUpdateRequest request) {
        ClienteResponse cliente = service.updateCliente(request);
        LOGGER.info("Cliente id " + request.getCodigo() + " alterado.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(cliente);
    }

    @Operation(summary = "Desativa um cliente")
    @DeleteMapping
    public ResponseEntity<Void> deleteCliente(@RequestBody DeleteClienteRequest deleteClienteRequest) {
        service.deleteCliente(deleteClienteRequest);
        LOGGER.info("Cliente id " + deleteClienteRequest.getCodigo() + " deletado.");
        return ResponseEntity.noContent().build();
    }
}
