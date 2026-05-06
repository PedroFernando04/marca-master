package citec.marca.services;

import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.DiasLiberadosRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DiasLiberadosRepository diasLiberadosRepository;

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
/*
    public List<String> buscarDiasLiberadosEspecialidade(String especialidade, Integer mes, Integer ano){
        EnumEspecialidades esp = EnumEspecialidades.valueOf(especialidade);

        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        return diasLiberadosRepository
                .findByEspecialidadeAndDataBetween(esp, inicio, fim)
                .stream()
                .map(d -> d.getData().toString()) // yyyy-MM-dd
                .toList();
    }

    */
}
