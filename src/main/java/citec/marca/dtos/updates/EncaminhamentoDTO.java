package citec.marca.dtos.updates;

import citec.marca.entities.enums.EnumStatusEncaminhamento;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EncaminhamentoDTO {
    private EnumStatusEncaminhamento status;

    private String descricao;
}
