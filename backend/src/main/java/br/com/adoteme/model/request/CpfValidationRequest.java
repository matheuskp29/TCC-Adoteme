package br.com.adoteme.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CpfValidationRequest {

    @CPF(message = "invalid CPF")
    private String cpf;
}
