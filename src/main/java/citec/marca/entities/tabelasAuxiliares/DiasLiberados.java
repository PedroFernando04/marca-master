package citec.marca.entities.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

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


    public DiasLiberados() {}

    public DiasLiberados(LocalDate data, EnumClinica clinica) {
        this.data = data;
        this.clinica = clinica;
    }

}
