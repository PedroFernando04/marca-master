package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class DiasLiberados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumClinica clinica;

    @Column(nullable = false)
    private Boolean turnoTarde = true;

    @Column
    private Boolean turnoManha = true;


    public DiasLiberados() {}

    public DiasLiberados(LocalDate data, EnumClinica clinica,  Boolean turnoTarde, Boolean turnoManha) {
        this.data = data;
        this.clinica = clinica;
        this.turnoTarde = turnoTarde != null ? turnoTarde : true;
        this.turnoManha = turnoManha != null ? turnoManha : true;
    }

}
