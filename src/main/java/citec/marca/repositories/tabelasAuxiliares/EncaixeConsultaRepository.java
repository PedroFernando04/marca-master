package citec.marca.repositories.tabelasAuxiliares;

import citec.marca.entities.tabelasAuxiliares.EncaixeConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncaixeConsultaRepository extends JpaRepository<EncaixeConsulta, Long> {
}
