package br.com.adoteme.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MensagemResponse {

    private String descricao;

    private Boolean ladoDireito;
}
