package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiasLiberadosRepository extends JpaRepository<DiasLiberados, Long> {
    
    Optional<DiasLiberados> findByDataAndClinica(LocalDate data, EnumClinica clinica);

    List<DiasLiberados> findByClinicaAndDataBetween (EnumClinica clinica, LocalDate incio, LocalDate fim);
}
