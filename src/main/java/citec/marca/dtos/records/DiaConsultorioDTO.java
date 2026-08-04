package citec.marca.dtos.records;

public record DiaConsultorioDTO(
        Long id,
        String clinica,
        String clinicaDescricao,
        String diaSemana,
        String diaSemanaDescricao,
        String especialidade,
        String especialidadeDescricao,
        String turno,
        String turnoDescricao
) {}