package citec.marca.dtos.records;

public record DiaLiberadoDTO(
        String data,
        Boolean turnoManha,
        Boolean turnoTarde
) {}