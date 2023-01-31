package br.com.adoteme.model.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatAvailabilityResponse {

    private Integer codigo;
    private Boolean status;
}
