package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    boolean existsByPacienteAndEspecialidade(
            Paciente paciente,
            EnumEspecialidades especialidade
    );

}
