package br.com.adoteme.model.request;

import br.com.adoteme.model.enums.PorteAnimal;
import br.com.adoteme.model.enums.TipoTemperamento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CriarAnuncioRequest {

    private Integer id;

    private String titulo;

    private String descricao;

    private String emailCliente;

    private Long idTipoAnimal;

    private Long idIdade;

    private Long idPorte;

    private Long idTemperamento;
}
