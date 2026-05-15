package citec.marca.entities.enums;

public enum EnumStatusAgendamento {
    AGUARDANDO ("Aguardando"),
    CONFIRMADO  ("Confirmado"),
    CANCELADO ("Cancelado");

    private String descricao;

    EnumStatusAgendamento(String descricao) {this.descricao = descricao;}

    public String getDescricao() {return this.descricao;}
}
