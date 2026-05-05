package citec.marca.dtos.enums;

import lombok.Getter;

@Getter
public class TipoFuncionarioDTO {
    private String codigo;
    private String descricao;

    public TipoFuncionarioDTO(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }
}
