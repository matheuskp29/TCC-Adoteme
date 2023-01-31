package br.com.adoteme.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MensagemDTO {

    private Integer codigoCliente;

    private String descricao;

    private LocalDateTime dataHora;
}
