package citec.marca.entities.enums;

public enum EnumEspecialidades {
    GERAL ("Clínico Geral"),
    CARDIO ("Cardiologia"),
    DERMATO ("Dermatologia"),
    PEDIATRA ("Pediatria"),
    ACUPUNTURA ("Acupuntura"),
    PSIQ ("Psiquiatria"),
    GO ("Ginecologia e Obstetrícia"),
    INFECTO ("Infecto"),
    GASTRO ("gastroenterologia "),
    ENDOCRINO ("Endócrino"),
    ONCO ("Oncologia"),
    HEMATO ("Hematologia"),
    VASCULAR ("Vascular"),
    NEFRO ("Nefrologia"),
    URO ("Urologia"),
    NEURO ("Neurologia"),
    OFTALMO ("Oftalmologia"),
    OTORRINO ("Otorrinolaringologia"),
    ORTOP ("Ortopedia"),
    REUMATO ("Reumatologia"),
    PROCTO ("Procotologia"),
    MASTO ("Mastologia"),
    HOMEOP ("Homeopatia"),
    PNEUMOLOGIA ("Pneumologia");



    private String descricao;

    EnumEspecialidades(String descricao){this.descricao = descricao;}

    public String getDescricao() {
        return descricao;
    }
}
