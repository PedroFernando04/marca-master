package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusAgendamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long>, JpaSpecificationExecutor<Agendamento> {

    boolean existsByPacienteAndEspecialidade(Paciente paciente, EnumEspecialidades especialidade);

    List<Agendamento> findByPacienteOrderByDataDesc(Paciente paciente);

    List<Agendamento> findByStatusAgendamento(EnumStatusAgendamento statusAgendamento);

}
