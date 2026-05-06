package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaConsultorioRepository extends JpaRepository<DiaConsultorio, Long> {

    List<DiaConsultorio> findByClinicaAndEspecialidade(EnumClinica clinica, EnumEspecialidades especialidade);

}
