package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaConsultorioRepository extends JpaRepository<DiaConsultorio, Long> {

    List<DiaConsultorio> findByClinicaAndEspecialidade(EnumClinica clinica, EnumEspecialidades especialidade);

    @Query("""
        SELECT DISTINCT d.especialidade
        FROM DiaConsultorio d
        WHERE d.clinica = :clinica
    """)
    List<EnumEspecialidades> findDistinctEspecialidadesByClinica(@Param("clinica") EnumClinica clinica);

    @Query("""
        select distinct d.clinica
        from DiaConsultorio d
        where d.especialidade = citec.marca.entities.enums.EnumEspecialidades.GERAL
    """)
    List<EnumClinica> findClinicasComClinicoGeral();

    @Query("""
        select distinct d.clinica
        from DiaConsultorio d
        where d.especialidade = :especialidade
    """)
    List<EnumClinica> findDistinctClinicasByEspecialidade(@Param("especialidade") EnumEspecialidades especialidade);

}
