package citec.marca.controllers;

import citec.marca.dtos.records.AgendamentoDTO;
import citec.marca.dtos.updates.EncaminhamentoDTO;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusEncaminhamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasPrincipais.FuncionarioRepository;
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
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping
    public ResponseEntity<Page<AgendamentoDTO>> buscarAgendamentos(Authentication authentication,
                                                                   @RequestParam(defaultValue = "0")
                                                                   int pagina,
                                                                   @RequestParam(required = false) EnumEspecialidades especialidade,
                                                                   @RequestParam(required = false) EnumStatusEncaminhamento statusEncaminhamento
    ) {
        String email = authentication.getName();

        Funcionario funcionario =
                funcionarioRepository
                        .findByEmailIgnoreCase(email)
                        .orElseThrow();

        Specification<Agendamento> spec =
                AgendamentoSpecification
                        .clinicaEquals(
                                funcionario.getClinica()
                        );

        if(especialidade != null){

            spec = spec.and(
                    AgendamentoSpecification
                            .especialidadeEquals(especialidade)
            );
        }

        if(statusEncaminhamento != null){

            spec = spec.and(
                    AgendamentoSpecification
                            .statusEncaminhamentoEquals(
                                    statusEncaminhamento
                            )
            );
        }

        Pageable pageable =
                PageRequest.of(
                        pagina,
                        15,
                        Sort.by("data").descending()
                );

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
                                agendamento.getClinica()
                        ));

        return ResponseEntity.ok(resultado);
    }

    @PutMapping("/{id}/encaminhamento")
    public ResponseEntity<Void> atualizarEncaminhamento(
            @PathVariable Long id,
            @RequestBody EncaminhamentoDTO dto
    ) {

        Agendamento agendamento = agendamentoRepository.findById(id).orElseThrow();

        agendamento.setStatusEncaminhamento(dto.getStatus());
        agendamento.setDescricaoEncaminhamento(dto.getDescricao());

        agendamentoRepository.save(agendamento);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/encaminhamento/arquivo")
    public ResponseEntity<Resource> visualizarArquivo(
            @PathVariable Long id
    ) throws IOException {

        Agendamento agendamento = agendamentoRepository.findById(id).get();

        Path path = Paths.get(
                agendamento.getEncaminhamentoMedicoPath()
        );

        Resource resource =
                new UrlResource(path.toUri());

        String tipo = Files.probeContentType(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(tipo))
                .body(resource);
    }
}