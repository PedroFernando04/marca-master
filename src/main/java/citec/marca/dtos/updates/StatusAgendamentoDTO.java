package citec.marca.dtos.updates;

import citec.marca.entities.enums.EnumStatusAgendamento;

public record StatusAgendamentoDTO (
        EnumStatusAgendamento status
) {}

