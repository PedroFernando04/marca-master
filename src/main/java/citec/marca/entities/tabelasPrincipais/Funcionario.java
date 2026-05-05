package citec.marca.entities.tabelasPrincipais;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumTipoFuncionario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("FUNCIONARIO")
public class Funcionario extends Usuario{

    @Column(length = 10, nullable = false, unique = true)
    private String matricula;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumTipoFuncionario tipoFuncionario;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumClinica clinica;

    public Funcionario() {}

    public Funcionario(String email, String senha, String nome, String matricula, EnumTipoFuncionario tipoFuncionario, EnumClinica clinica) {
        super(email, senha, nome);
        this.matricula = matricula;
        this.tipoFuncionario = tipoFuncionario;
        this.clinica = clinica;
    }

}
