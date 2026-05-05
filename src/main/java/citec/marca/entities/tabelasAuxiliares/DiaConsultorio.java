package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.enums.EnumConsultorio;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
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

    @Column
    @Enumerated(EnumType.STRING)
    private EnumConsultorio consultorio;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumDiasSemana diaSemana;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumEspecialidades especialidade;

    @Column
    @Enumerated(EnumType.STRING)
    private EnumTurnos turno;


    public DiaConsultorio() {}

    public DiaConsultorio(EnumConsultorio consultorio, EnumDiasSemana diasSemana, EnumEspecialidades especialidade, EnumTurnos turno) {
        this.consultorio = consultorio;
        this.especialidade = especialidade;
        this.turno = turno;
    }
}
