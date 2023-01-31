package br.com.adoteme.controller;

import br.com.adoteme.model.response.EstadoResponse;
import br.com.adoteme.service.EstadoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Estados")
@RestController
@RequiredArgsConstructor
@RequestMapping("/estado")
public class EstadoController {

    private final EstadoService service;

    @Operation(summary = "Retorna lista de estados")
    @GetMapping
    public ResponseEntity<List<EstadoResponse>> getEstados() {
        return ResponseEntity.ok(service.findAll());
    }
}
