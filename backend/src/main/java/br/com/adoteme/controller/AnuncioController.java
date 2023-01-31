package br.com.adoteme.controller;

import br.com.adoteme.model.request.AnuncioRequest;
import br.com.adoteme.model.request.CriarAnuncioRequest;
import br.com.adoteme.model.request.UpdateAnuncioRequest;
import br.com.adoteme.model.response.AnuncioClienteResponse;
import br.com.adoteme.model.response.AnuncioResponse;
import br.com.adoteme.service.AnuncioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController

@RequestMapping("/anuncio")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Anúncio", description = "Endpoints Anúncio")
public class AnuncioController {

    private final AnuncioService service;

    @Operation (summary = "Retorna anúncio por id")
    @GetMapping("/{id}")
    public ResponseEntity<AnuncioClienteResponse> getAnuncioById(@PathVariable("id") Integer id, Integer idCliente) {
        return ResponseEntity.ok(service.getAnuncioById(id, idCliente));
    }

    @Operation(summary = "Retorna lista de anúncio")
    @GetMapping
    public ResponseEntity<List<AnuncioResponse>> getAnuncios(@Valid AnuncioRequest request) {
        return ResponseEntity.ok(service.getAnuncios(request));
    }

    @Operation(summary = "Salva um anúncio")
    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> save(@RequestPart CriarAnuncioRequest request, @RequestPart(required = false) MultipartFile foto) {
        service.save(request, foto);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @Operation(summary = "Desativar um anúncio")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Alterar anúncio")
    @PutMapping("/update/{id}")
    public ResponseEntity<HttpStatus> update(@PathVariable Integer id, @RequestPart UpdateAnuncioRequest request, @RequestPart(required = false) MultipartFile foto) throws IOException {
        service.update(id, request, foto);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

}
