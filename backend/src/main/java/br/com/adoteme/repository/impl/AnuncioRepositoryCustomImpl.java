package br.com.adoteme.repository.impl;

import br.com.adoteme.model.request.AnuncioRequest;
import br.com.adoteme.model.response.AnuncioResponse;
import br.com.adoteme.repository.AnuncioRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

import static java.util.Objects.nonNull;

@Repository
@RequiredArgsConstructor
public class AnuncioRepositoryCustomImpl implements AnuncioRepositoryCustom {

    private final EntityManager em;

    @Override
    public List<AnuncioResponse> findAnunciosByFilter(AnuncioRequest request) {

        StringBuilder queryBuilder = new StringBuilder();

        queryBuilder.append("SELECT new br.com.adoteme.model.response.AnuncioResponse(a.codigo, a.titulo, i.idade, ta.nome, " +
                "p.nome, t.nome, a.imagem, f.codigo, c.codigo) " +
                "FROM Anuncio a " +
                "INNER JOIN a.cliente c " +
                "INNER JOIN c.estado e " +
                "INNER JOIN a.idade i " +
                "INNER JOIN a.tipoAnimal ta " +
                "INNER JOIN a.porte p " +
                "INNER JOIN a.temperamento t " +
                "LEFT JOIN Favorito f ON :idCliente = f.cliente.codigo AND a.codigo = f.anuncio.codigo " +
                "WHERE a.flagAtivo = true ");

        if (nonNull(request.getIdCliente())) {
            if (request.getMeusAnuncios()) {
                queryBuilder.append("AND c.codigo = :idCliente ");
            } else {
                queryBuilder.append("AND c.codigo != :idCliente ");
            }
        }
        if (request.getFavoritos()) queryBuilder.append("AND f.codigo IS NOT NULL ");

        if (nonNull(request.getTipoAnimal())) queryBuilder.append("AND ta.codigo = :tipoAnimal ");
        if (nonNull(request.getPorte())) queryBuilder.append("AND p.idPorte = :porte ");
        if (nonNull(request.getTemperamento())) queryBuilder.append("AND t.idTemperamento = :temperamento ");
        if (nonNull(request.getEstado())) queryBuilder.append("AND e.codigo = :estado ");
        if (nonNull(request.getIdade())) queryBuilder.append("AND i.codigo = :idade ");

        TypedQuery<AnuncioResponse> query = em.createQuery(queryBuilder.toString(), AnuncioResponse.class);

        if (nonNull(request.getIdCliente())) {
            query.setParameter("idCliente", request.getIdCliente());
        } else {
            query.setParameter("idCliente", null);
        }
        if (nonNull(request.getTipoAnimal())) query.setParameter("tipoAnimal", request.getTipoAnimal());
        if (nonNull(request.getPorte())) query.setParameter("porte", request.getPorte());
        if (nonNull(request.getTemperamento())) query.setParameter("temperamento", request.getTemperamento());
        if (nonNull(request.getEstado())) query.setParameter("estado", request.getEstado());
        if (nonNull(request.getIdade())) query.setParameter("idade", request.getIdade());

        return query.getResultList();
    }
}
