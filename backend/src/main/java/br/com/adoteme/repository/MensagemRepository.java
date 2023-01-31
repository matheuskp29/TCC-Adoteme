package br.com.adoteme.repository;

import br.com.adoteme.model.dto.MensagemDTO;
import br.com.adoteme.model.entity.Mensagem;
import br.com.adoteme.model.response.ChatResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, Integer> {

    @Query("SELECT new br.com.adoteme.model.dto.MensagemDTO(cld.codigo, msg.descricao, msg.dataHora) " +
            "FROM Mensagem msg " +
            "INNER JOIN msg.anuncio an " +
            "INNER JOIN an.cliente clo " +
            "INNER JOIN msg.cliente cld " +
            "WHERE an.codigo = ?1 AND (clo.codigo = ?2 OR clo.codigo = ?3) AND (cld.codigo = ?2 OR cld.codigo = ?3) " +
            "ORDER BY msg.dataHora DESC")
    List<MensagemDTO> findByAnuncioAndClienteAutenticadoAndClienteDestino(Integer codigoAnuncio, Integer codigoClienteAutenticado, Integer codigoClienteDestino);

    @Query("SELECT new br.com.adoteme.model.response.ChatResponse(anc.codigo, anc.titulo, mcl.codigo, acl.codigo, acl.nome, mcl.nome, msg.chat.codigo, msg.chat.status, anc.imagem) " +
            "FROM Mensagem msg " +
            "INNER JOIN msg.anuncio anc " +
            "INNER JOIN anc.cliente acl " +
            "INNER JOIN msg.cliente mcl " +
            "WHERE acl.codigo = ?1 OR mcl.codigo = ?1")
    List<ChatResponse> findByCodigoCliente(Integer codigoCliente);
}
