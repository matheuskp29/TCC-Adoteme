package br.com.adoteme.repository;

import br.com.adoteme.model.request.AnuncioRequest;
import br.com.adoteme.model.response.AnuncioResponse;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnuncioRepositoryCustom {

    List<AnuncioResponse> findAnunciosByFilter(AnuncioRequest request);
}
