package citec.marca.dtos.records;

public record NovoDiaConsultorioDTO(
        String clinica,
        String diaSemana,
        String especialidade,
        String turno
) {}