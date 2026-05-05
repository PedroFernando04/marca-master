package citec.marca.dtos.enums;

import lombok.Getter;

@Getter
public class ClinicaDTO {
    private String codigo;
    private String descricao;
    private String endereco;

    public ClinicaDTO(String codigo, String descricao, String endereco) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.endereco = endereco;
    }

}
