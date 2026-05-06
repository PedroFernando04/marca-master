package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DiaConsultorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumClinica clinica;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumDiasSemana diaSemana;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumEspecialidades especialidade;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumTurnos turno;


    public DiaConsultorio() {}

    public DiaConsultorio(EnumClinica clinica, EnumDiasSemana diasSemana, EnumEspecialidades especialidade, EnumTurnos turno) {
        this.clinica = clinica;
        this.especialidade = especialidade;
        this.turno = turno;
        this.diaSemana = diasSemana;
    }
}
