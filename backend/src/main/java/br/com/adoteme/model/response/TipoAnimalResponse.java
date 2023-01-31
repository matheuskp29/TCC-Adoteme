package br.com.adoteme.model.response;

import br.com.adoteme.model.entity.TipoAnimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TipoAnimalResponse {

    private Long id;

    private String nome;

}
