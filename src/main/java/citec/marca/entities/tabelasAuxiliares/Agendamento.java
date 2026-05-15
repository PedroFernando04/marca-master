package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.enums.*;
import citec.marca.entities.tabelasPrincipais.Paciente;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Paciente paciente;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumClinica clinica;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumTipoAgendamento tipo;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumEspecialidades especialidade;

    @Column
    private String encaminhamentoMedicoPath;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumStatusAgendamento statusAgendamento;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumStatusEncaminhamento statusEncaminhamento;

    @Column
    private String descricaoEncaminhamento;

    public Agendamento() {}

    public Agendamento(
            Paciente paciente,
            EnumClinica clinica,
            LocalDate data,
            EnumTipoAgendamento tipo,
            EnumEspecialidades especialidade,
            String encaminhamentoMedicoPath,
            EnumStatusAgendamento statusAgendamento,
            EnumStatusEncaminhamento statusEncaminhamento,
            String descricaoEncaminhamento
    ) {
        this.paciente = paciente;
        this.clinica = clinica;
        this.data = data;
        this.tipo = tipo;
        this.especialidade = especialidade;
        this.encaminhamentoMedicoPath = encaminhamentoMedicoPath;
        this.statusAgendamento = statusAgendamento;
        this.statusEncaminhamento = statusEncaminhamento;
        this.descricaoEncaminhamento = descricaoEncaminhamento;
    }
}
