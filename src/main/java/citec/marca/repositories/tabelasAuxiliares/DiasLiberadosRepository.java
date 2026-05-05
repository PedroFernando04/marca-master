package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DiasLiberadosRepository extends JpaRepository<DiasLiberados, Long> {
    
    Optional<DiasLiberados> findByDataAndEspecialidade(LocalDate data, EnumEspecialidades especialidade);
}
