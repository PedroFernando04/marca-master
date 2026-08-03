package citec.marca.controllers;

import citec.marca.dtos.enums.*;
import citec.marca.dtos.records.PacienteDTO;
import citec.marca.entities.enums.*;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/enum")
public class EnumController {

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping("/especialidades")
    public List<EspecialidadeDTO> listarEspecialidades() {
        return Arrays.stream(EnumEspecialidades.values())
                .sorted(Comparator.comparing(EnumEspecialidades::getDescricao))
                .map(e -> new EspecialidadeDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/especialidades/{clinica}")
    public List<EspecialidadeDTO> listarEspecialidadesPorClinica(
            @PathVariable String clinica
    ) {
        EnumClinica enumClinica = EnumClinica.valueOf(clinica.trim());

        return diaConsultorioRepository
                .findDistinctEspecialidadesByClinica(enumClinica)
                .stream()
                .sorted(Comparator.comparing(EnumEspecialidades::getDescricao))
                .map(e -> new EspecialidadeDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/clinicas")
    public List<ClinicaDTO> listarClinicas() {
        return Arrays.stream(EnumClinica.values())
                .sorted(Comparator.comparing(EnumClinica::getDescricao))
                .map(e -> new ClinicaDTO(e.name(), e.getDescricao(), e.getEndereco()))
                .toList();
    }

    @GetMapping("/clinicas/clinico-geral")
    public List<ClinicaDTO> listarClinicasComClinicoGeral() {

        return diaConsultorioRepository
                .findClinicasComClinicoGeral()
                .stream()
                .sorted(Comparator.comparing(EnumClinica::getDescricao))
                .map(c -> new ClinicaDTO(
                        c.name(),
                        c.getDescricao(),
                        c.getEndereco()
                ))
                .toList();
    }

    @GetMapping("/tiposFuncionario")
    public List<TipoFuncionarioDTO> listarTiposFuncionario() {
        return Arrays.stream(EnumTipoFuncionario.values())
                .sorted(Comparator.comparing(EnumTipoFuncionario::getDescricao))
                .map(e -> new TipoFuncionarioDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/statusEncaminhamento")
    public List<StatusEncaminhamentoDTO>
    listarStatusEncaminhamento() {

        return Arrays.stream(
                        EnumStatusEncaminhamento.values()
                )
                .sorted(Comparator.comparing(
                        EnumStatusEncaminhamento::getDescricao
                ))
                .map(e -> new StatusEncaminhamentoDTO(
                        e.name(),
                        e.getDescricao()
                ))
                .toList();
    }

    @GetMapping("/statusAgendamento")
    public List<StatusAgendamentoDTO>
    listarStatusAgendamento() {

        return Arrays.stream(
                        EnumStatusAgendamento.values()
                )
                .sorted(Comparator.comparing(
                        EnumStatusAgendamento::getDescricao
                ))
                .map(e -> new StatusAgendamentoDTO(
                        e.name(),
                        e.getDescricao()
                ))
                .toList();
    }

    @GetMapping("/pacientes")
    public List<PacienteDTO>
    listarPacientes(@RequestParam String nome) {
        return pacienteRepository.findTop20ByNomeContainingIgnoreCase(nome)
                .stream()
                .sorted(Comparator.comparing(Paciente::getNome))
                .map(p -> new PacienteDTO(
                        p.getId(),
                        p.getNome()
                ))
                .toList();
    }

    @GetMapping("/clinicas/{especialidade}")
    public List<ClinicaDTO> listarClinicasPorEspecialidade(
            @PathVariable String especialidade
    ) {
        EnumEspecialidades enumEspecialidade = EnumEspecialidades.valueOf(especialidade.trim());

        return diaConsultorioRepository
                .findDistinctClinicasByEspecialidade(enumEspecialidade)
                .stream()
                .sorted(Comparator.comparing(EnumClinica::getDescricao))
                .map(c -> new ClinicaDTO(c.name(), c.getDescricao(), c.getEndereco()))
                .toList();
    }


    @GetMapping("/diasSemana")
    public List<DiaSemanaDTO> listarDiasSemana() {
        return Arrays.stream(EnumDiasSemana.values())
                .map(e -> new DiaSemanaDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/turnos")
    public List<TurnoDTO> listarTurnos() {
        return Arrays.stream(EnumTurnos.values())
                .map(e -> new TurnoDTO(e.name(), e.getDescricao()))
                .toList();
    }
}