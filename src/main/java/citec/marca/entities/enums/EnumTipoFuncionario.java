package citec.marca.entities.enums;

public enum EnumTipoFuncionario {
    ATENDENTE ("Atendente"),
    RESPONSAVEL ("Responsável");

    private String descricao;

    private EnumTipoFuncionario(String descricao) {this.descricao = descricao;}

    public String getDescricao() {return descricao;}
}
