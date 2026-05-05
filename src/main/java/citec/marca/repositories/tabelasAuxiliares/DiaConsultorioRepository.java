package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumConsultorio;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaConsultorioRepository extends JpaRepository<DiaConsultorio, Long> {
    Optional<DiaConsultorio> findByConsultorioAndDiaSemanaAndTurno(EnumConsultorio consultorio, EnumDiasSemana diasSemana, EnumTurnos turno);

}
