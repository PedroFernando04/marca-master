package citec.marca.entities.enums;

public enum EnumConsultorio {
    CONSULTORIO1 ("Consultório 1"),
    CONSULTORIO2 ("Consultório 2"),
    CONSULTORIO3 ("Consultório 3"),
    CONSULTORIO4 ("Consultório 4"),
    CONSULTORIO5 ("Consultório 5"),
    CONSULTORIO6 ("Consultório 6"),
    CONSULTORIO7 ("Consultório 7"),
    CONSULTORIO8 ("Consultório 8"),
    CONSULTORIO9 ("Consultório 9"),
    CONSULTORIO10 ("Consultório 10"),
    CONSULTORIO11 ("Consultório 11"),
    CONSULTORIO12 ("Consultório 12"),
    CONSULTORIO13 ("Consultório 13"),
    CONSULTORIO14 ("Consultório 14"),
    CONSULTORIO15 ("Consultório 15"),
    CONSULTORIO16 ("Consultório 16"),
    CONSULTORIO17 ("Consultório 17");

    private String descricao;

    EnumConsultorio(String descricao) {this.descricao = descricao;}

    public String getDescricao() {return descricao;}
}
