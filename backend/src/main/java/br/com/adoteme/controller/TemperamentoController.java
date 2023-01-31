package br.com.adoteme.controller;

import br.com.adoteme.model.response.TemperamentoResponse;
import br.com.adoteme.service.TemperamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/temperamento")
@RequiredArgsConstructor
public class TemperamentoController {

    private final TemperamentoService temperamentoService;

    @GetMapping
    public ResponseEntity<List<TemperamentoResponse>> getTemperamentos() {
        return ResponseEntity.ok(temperamentoService.getTemperamentos());
    }

}
