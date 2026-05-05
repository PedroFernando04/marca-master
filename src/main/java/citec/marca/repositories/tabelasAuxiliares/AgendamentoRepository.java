package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.tabelasAuxiliares.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}
