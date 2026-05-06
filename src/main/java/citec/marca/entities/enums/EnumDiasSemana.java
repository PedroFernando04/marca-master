package citec.marca.entities.enums;

import java.time.DayOfWeek;

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

    public static EnumDiasSemana de(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> SEGUNDA;
            case TUESDAY -> TERCA;
            case WEDNESDAY -> QUARTA;
            case THURSDAY -> QUINTA;
            case FRIDAY -> SEXTA;
            case SATURDAY -> SABADO;
            case SUNDAY -> DOMINGO;
        };
    }

}
