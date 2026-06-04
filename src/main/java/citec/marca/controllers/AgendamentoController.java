package citec.marca.controllers;

import citec.marca.dtos.records.AgendamentoDTO;
import citec.marca.dtos.updates.EncaminhamentoDTO;
import citec.marca.dtos.updates.StatusAgendamentoDTO;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusAgendamento;
import citec.marca.entities.enums.EnumStatusEncaminhamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasPrincipais.FuncionarioRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import citec.marca.services.AgendamentoService;
import citec.marca.specifications.AgendamentoSpecification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public ResponseEntity<Page<AgendamentoDTO>> buscarAgendamentos(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(required = false) EnumEspecialidades especialidade,
            @RequestParam(required = false) EnumStatusEncaminhamento statusEncaminhamento,
            @RequestParam(required = false) LocalDate data,
            @RequestParam(required = false) Boolean filaDeEspera
    ) {
        String email = authentication.getName();

        Funcionario funcionario = funcionarioRepository.findByEmailIgnoreCase(email).orElseThrow();

        Specification<Agendamento> spec = AgendamentoSpecification.clinicaEquals(funcionario.getClinica());

        if(especialidade != null){
            spec = spec.and(
                    AgendamentoSpecification
                            .especialidadeEquals(especialidade)
            );
        }

        if(statusEncaminhamento != null){
            spec = spec.and(
                    AgendamentoSpecification
                            .statusEncaminhamentoEquals(statusEncaminhamento)
            );
        }

        if(data != null){
            spec = spec.and(
                    AgendamentoSpecification
                            .dataEquals(data)
            );
        }

        if (filaDeEspera != null) {
            spec = spec.and(
                    AgendamentoSpecification
                            .filaDeEsperaEquals(filaDeEspera)
            );
        }

        Pageable pageable = PageRequest.of(pagina,5,Sort.by("data").ascending());

        Page<AgendamentoDTO> resultado =
                agendamentoRepository
                        .findAll(spec, pageable)
                        .map(agendamento -> new AgendamentoDTO(
                                agendamento.getId(),
                                agendamento.getPaciente().getNome(),
                                agendamento.getData(),
                                agendamento.getEspecialidade(),
                                agendamento.getStatusEncaminhamento(),
                                agendamento.getDescricaoEncaminhamento(),
                                agendamento.getEncaminhamentoMedicoPath(),
                                agendamento.getStatusAgendamento(),
                                agendamento.getClinica(),
                                agendamento.getFilaDeEspera()
                        ));

        return ResponseEntity.ok(resultado);
    }

    @PutMapping("/{id}/encaminhamento")
    public ResponseEntity<Void> atualizarEncaminhamento(
            @PathVariable Long id,
            @RequestBody EncaminhamentoDTO dto
    ) {

        agendamentoService.atualizarStatusEncaminhamento(id, dto);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/encaminhamento/arquivo")
    public ResponseEntity<Resource> visualizarArquivo(@PathVariable Long id) throws IOException {

        Agendamento agendamento = agendamentoRepository.findById(id).get();

        Path path = Paths.get(agendamento.getEncaminhamentoMedicoPath());

        Resource resource = new UrlResource(path.toUri());

        String tipo = Files.probeContentType(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(tipo))
                .body(resource);
    }

    @GetMapping("/paciente")
    public ResponseEntity<Page<AgendamentoDTO>> buscarAgendamentosPaciente(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int pagina
    ) {

        String email = authentication.getName();

        Paciente paciente =
                pacienteRepository
                        .findByEmailIgnoreCase(email)
                            .orElseThrow();

        Pageable pageable = PageRequest.of(
                pagina,
                5,
                Sort.by("data")
                        .ascending()
                        .and(Sort.by("id").ascending())
        );

        Page<AgendamentoDTO> agendamentos =
                agendamentoRepository
                        .findByPaciente(paciente, pageable)
                        .map(agendamento -> new AgendamentoDTO(
                                agendamento.getId(),
                                agendamento.getPaciente().getNome(),
                                agendamento.getData(),
                                agendamento.getEspecialidade(),
                                agendamento.getStatusEncaminhamento(),
                                agendamento.getDescricaoEncaminhamento(),
                                agendamento.getEncaminhamentoMedicoPath(),
                                agendamento.getStatusAgendamento(),
                                agendamento.getClinica(),
                                agendamento.getFilaDeEspera()
                        ));

        return ResponseEntity.ok(agendamentos);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatusAgendamento(
            @PathVariable Long id,
            @RequestBody StatusAgendamentoDTO dto,
            Authentication authentication

    ){
        agendamentoService.atualizarStatusAgendamento(
                id,
                dto
        );

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAgendamento(
            @PathVariable Long id,
            Authentication authentication
    ) {
        agendamentoService.deletarAgendamento(authentication.getName(), id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/liberar")
    public ResponseEntity<Void> liberarFilaDeEspera(
            @PathVariable Long id
    ) {

        Agendamento agendamento =
                agendamentoRepository
                        .findById(id)
                        .orElseThrow();

        agendamento.setFilaDeEspera(false);

        agendamentoRepository.save(agendamento);

        return ResponseEntity.noContent().build();
    }
}