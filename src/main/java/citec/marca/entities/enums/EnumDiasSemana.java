package citec.marca.entities.enums;

public enum EnumDiasSemana {
    SEGUNDA ("Segunda"),
    TERCA ("Terça"),
    QUARTA ("Quarta"),
    QUINTA ("Quinta"),
    SEXTA ("Sexta"),
    SABADO ("Sábado"),
    DOMINGO ("Domingo");

    private String descricao;

    EnumDiasSemana(String descricao) {this.descricao = descricao;}

    public String getDescricao() {
        return descricao;
    }


}
