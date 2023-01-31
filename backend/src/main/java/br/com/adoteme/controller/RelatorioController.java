package br.com.adoteme.controller;

import br.com.adoteme.model.response.AnuncioClienteResponse;
import br.com.adoteme.model.response.RelatorioResponse;
import br.com.adoteme.service.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relatorio")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Relatório", description = "Endpoints Relatório")
public class RelatorioController {

    private final RelatorioService service;

    @Operation(summary = "Retorna relatório administrativo")
    @GetMapping
    public ResponseEntity<RelatorioResponse> getRelatorio() {
        return ResponseEntity.ok(service.getRelatorio());
    }
}
