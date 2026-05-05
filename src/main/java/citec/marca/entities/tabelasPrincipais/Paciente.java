package citec.marca.entities.tabelasPrincipais;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("PACIENTE")
public class Paciente extends Usuario {

    @Column(unique = true, length = 11, nullable = false)
    private String cpf;

    @Column(unique = true, length = 11, nullable = false)
    private String telefone;

    public Paciente() {}

    public Paciente(String email, String senha, String nome, String cpf, String telefone){
        super(email, senha, nome);
        this.cpf = cpf;
        this.telefone = telefone;
    }
}
