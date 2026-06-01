package citec.marca.services;

import citec.marca.dtos.records.DiaAgendaDTO;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import citec.marca.repositories.tabelasAuxiliares.DiasLiberadosRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DiasLiberadosRepository diasLiberadosRepository;

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

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

    public List<DiaAgendaDTO> buscarDiasLiberadosEspecialidade(String clinica, String especialidade, Integer mes, Integer ano
    ) {
        EnumEspecialidades esp = EnumEspecialidades.valueOf(especialidade);
        EnumClinica cli = EnumClinica.valueOf(clinica);

        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        List<DiasLiberados> diasLiberados =
                diasLiberadosRepository.findByClinicaAndDataBetween(cli, inicio, fim);

        List<DiaConsultorio> diasEspecialidadeAtua =
                diaConsultorioRepository.findByClinicaAndEspecialidade(cli, esp);

        Set<EnumDiasSemana> diasSemanaEspecialidade =
                diasEspecialidadeAtua.stream()
                        .map(DiaConsultorio::getDiaSemana)
                        .collect(Collectors.toSet());

        return diasLiberados.stream()
                .map(DiasLiberados::getData)
                .filter(data ->
                        diasSemanaEspecialidade.contains(
                                EnumDiasSemana.de(data.getDayOfWeek())
                        )
                )
                .map(data -> new DiaAgendaDTO(
                        data.toString(),
                        agendamentoRepository.countByDataAndClinicaAndEspecialidade(data, cli, esp) >= 4
                ))
                .toList();
    }
}
