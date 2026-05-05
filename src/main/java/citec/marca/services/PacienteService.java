package citec.marca.services;

import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Paciente salvarPaciente(Paciente paciente){
        Optional<Paciente> cpfBuscado = pacienteRepository.findByCpf(paciente.getCpf());
        Optional<Paciente> telefoneBuscado = pacienteRepository.findByTelefone(paciente.getTelefone());
        Optional<Paciente> emailBuscado = pacienteRepository.findByEmailIgnoreCase(paciente.getEmail());

        if (cpfBuscado.isPresent()) {
            throw new IllegalArgumentException("CPF já cadstrado");
        }
        if (telefoneBuscado.isPresent()) {
            throw new IllegalArgumentException("Telefone já cadastrado");
        }
        if (emailBuscado.isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        paciente.setSenha(passwordEncoder.encode(paciente.getSenha()));

        return pacienteRepository.save(paciente);
    }
}
