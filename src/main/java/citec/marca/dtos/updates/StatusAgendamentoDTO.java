package citec.marca.dtos.updates;

import citec.marca.entities.enums.EnumStatusAgendamento;
import lombok.Getter;
import lombok.Setter;

import java.beans.ConstructorProperties;

@Getter
@Setter
public class StatusAgendamentoDTO {
    private EnumStatusAgendamento status;

    public StatusAgendamentoDTO(EnumStatusAgendamento status) {
        this.status = status;
    }
}

