package citec.marca.entities.enums;

public enum EnumStatusEncaminhamento {
    AGUARDANDO ("Aguardando"),
    APROVADO ("Aprovado"),
    REPROVADO ("Reprovado"),;

    private String descricao;

    EnumStatusEncaminhamento(String descricao) {this.descricao = descricao;}

    public String getDescricao() {return descricao;}
}
