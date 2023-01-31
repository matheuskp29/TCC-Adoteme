package br.com.adoteme.controller;

import br.com.adoteme.model.response.TipoAnimalResponse;
import br.com.adoteme.service.TipoAnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tipo")
@RequiredArgsConstructor
public class TipoAnimalController {

    private final  TipoAnimalService tipoAnimalService;

    @GetMapping
    public ResponseEntity<List<TipoAnimalResponse>> getTiposAnimal() {
        return ResponseEntity.ok(tipoAnimalService.getTipos());
    }
}
