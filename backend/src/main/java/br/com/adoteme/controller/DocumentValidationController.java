package br.com.adoteme.controller;

import br.com.adoteme.model.request.CpfValidationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/cpf")
@RequiredArgsConstructor
public class DocumentValidationController {


    @PostMapping
    public ResponseEntity<Void> validateCpf(@Valid @RequestBody CpfValidationRequest request) {
        return ResponseEntity.ok().build();
    }
}
