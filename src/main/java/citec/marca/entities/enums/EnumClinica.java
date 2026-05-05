package citec.marca.entities.enums;

public enum EnumClinica {
    CEIS_I ("CEIS I (Galeria)", "Rua Cônego Machado, 1043, Farol "),
    CEIS_C ("CEIS Centenário", "Av. Moreira e Silva, 1035, Farol"),
    MARCO_MOTA ("Marco Mota", "Rua Cônego Machado, 885, Farol"),
    CEIS_ESTACIO ("CEIS Estácio Valente"," Rua Cônego Machado, 864, Farol "),
    UBS ("UBS", "Rua Odete Pacheco, 38, Farol "),
    UDA ("UDA"," Rua Odete Pacheco, 79, Farol");

    private String nome;
    private String endereco;

    EnumClinica(String nome, String endereco) {
        this.nome = nome;
        this.endereco = endereco;
    }

    public String getNome() {return this.nome;}
    public String getEndereco() {return this.endereco;}
}
