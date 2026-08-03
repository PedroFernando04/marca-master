package citec.marca.dtos.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaConsultorioRequest {

    private String clinica;

    private String diaSemana;

    private String especialidade;

    private String turno;
}