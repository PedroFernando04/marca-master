package citec.marca.dtos.enums;

import lombok.Getter;

@Getter
public class DiaSemanaDTO {
    private String codigo;
    private String descricao;

    public DiaSemanaDTO(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }
}