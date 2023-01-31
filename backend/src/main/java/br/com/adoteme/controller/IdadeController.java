package br.com.adoteme.controller;

import br.com.adoteme.model.response.IdadeResponse;
import br.com.adoteme.service.IdadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/idade")
@RequiredArgsConstructor
public class IdadeController {

    private final IdadeService idadeService;

    @GetMapping
    public ResponseEntity<List<IdadeResponse>> getIdades() {
        return ResponseEntity.ok(idadeService.getIdades());
    }
}
