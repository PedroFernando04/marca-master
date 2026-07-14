package citec.marca.dtos.records;

public record DiaAgendaDTO(
        String data,
        boolean lotado,
        boolean turnoManha,
        boolean turnoTarde
) {}