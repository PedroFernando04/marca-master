package citec.marca.entities.enums;

public enum EnumTipoAgendamento {
    PRIMEIRO ("Primeira Consulta"),
    RETORNO ("Retorno");

    private String descricao;

    EnumTipoAgendamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
