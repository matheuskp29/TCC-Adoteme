package br.com.adoteme.controller;

import br.com.adoteme.model.response.PorteResponse;
import br.com.adoteme.service.PorteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/porte")
@RequiredArgsConstructor
public class PorteController {

    private final PorteService porteService;

    @GetMapping
    public ResponseEntity<List<PorteResponse>> getPortes() {
        return ResponseEntity.ok(porteService.getPortes());
    }
}
