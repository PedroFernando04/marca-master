package citec.marca.dtos.enums;

import lombok.Getter;

@Getter
public class TurnoDTO {
    private String codigo;
    private String descricao;

    public TurnoDTO(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

}