package citec.marca.dtos.records;

import citec.marca.entities.enums.*;

import java.time.LocalDate;

public record AgendamentoDTO(

        Long id,
        String nomePaciente,
        LocalDate data,
        EnumEspecialidades especialidade,
        EnumStatusEncaminhamento statusEncaminhamento,
        String descricaoEncaminhamento,
        String encaminhamentoMedicoPath,
        EnumStatusAgendamento statusAgendamento,
        EnumClinica clinica,
        Boolean filaDeEspera,
        EnumTurnos turno

) {}