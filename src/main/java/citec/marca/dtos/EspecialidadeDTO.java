package citec.marca.dtos;

import lombok.Getter;

@Getter
public class EspecialidadeDTO {
    private String codigo;
    private String descricao;

    public EspecialidadeDTO(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

}