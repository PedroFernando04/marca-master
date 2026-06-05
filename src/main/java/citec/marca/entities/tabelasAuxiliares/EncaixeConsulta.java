package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.tabelasPrincipais.Funcionario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class EncaixeConsulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Agendamento agendamentoId;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Funcionario funcionarioId;

    @Column
    private LocalDateTime log;

    public EncaixeConsulta() {}

    public EncaixeConsulta(Agendamento agendamentoId, Funcionario funcionarioId, LocalDateTime log) {
        this.agendamentoId = agendamentoId;
        this.funcionarioId = funcionarioId;
        this.log = log;
    }
}
