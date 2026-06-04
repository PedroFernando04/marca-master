package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusAgendamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long>, JpaSpecificationExecutor<Agendamento> {

    boolean existsByPacienteAndEspecialidade(Paciente paciente, EnumEspecialidades especialidade);

    Page<Agendamento> findByPaciente(Paciente paciente, Pageable pageable);

    List<Agendamento> findByStatusAgendamento(EnumStatusAgendamento statusAgendamento);

    Long countByDataAndClinicaAndEspecialidadeAndStatusAgendamentoNotAndFilaDeEspera(LocalDate data, EnumClinica clinica, EnumEspecialidades especialidade, EnumStatusAgendamento statusAgendamento, Boolean filaDeEspera);

    Optional<Agendamento> findFirstByFilaDeEsperaAndDataAndClinicaAndEspecialidadeOrderByIdAsc(Boolean filaDeEspera, LocalDate data, EnumClinica clinica, EnumEspecialidades especialidade);

}
