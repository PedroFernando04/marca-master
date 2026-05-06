package citec.marca.repositories.tabelasPrincipais;

import citec.marca.entities.tabelasPrincipais.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByCpf(String cpf);

    Optional<Paciente> findByEmailIgnoreCase(String email);

    Optional<Paciente> findByTelefone(String telefone);

}
