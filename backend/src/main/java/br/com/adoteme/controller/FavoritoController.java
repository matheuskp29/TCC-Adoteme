package br.com.adoteme.controller;

import br.com.adoteme.model.request.FavoritoRequest;
import br.com.adoteme.service.FavoritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favorito")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService service;

    @PostMapping
    public ResponseEntity<HttpStatus> favoritarAnuncio(@RequestBody FavoritoRequest request) {
        service.favoritarAnuncio(request);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
