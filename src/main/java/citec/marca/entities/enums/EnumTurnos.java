package citec.marca.entities.enums;

public enum EnumTurnos {
    MANHA ("Manhã"),
    TARDE ("Tarde");

    private String descricao;

    private EnumTurnos(String descricao) {this.descricao = descricao;}

    public String getDescricao() {return descricao;}
}
