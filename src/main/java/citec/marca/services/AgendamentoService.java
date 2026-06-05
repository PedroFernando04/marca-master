package citec.marca.services;

import citec.marca.dtos.requests.AgendarConsultaRequest;
import citec.marca.dtos.updates.EncaminhamentoDTO;
import citec.marca.dtos.updates.StatusAgendamentoDTO;
import citec.marca.entities.enums.*;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class AgendamentoService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento agendarConsulta(AgendarConsultaRequest request) throws IOException {

        Paciente paciente = pacienteRepository.findById(request.getPacienteId()).orElseThrow();

        EnumEspecialidades especialidade = EnumEspecialidades.valueOf(request.getEspecialidade());

        boolean jaExiste = agendamentoRepository.existsByPacienteAndEspecialidade(paciente,especialidade);

        EnumTipoAgendamento tipo = jaExiste ? EnumTipoAgendamento.RETORNO : EnumTipoAgendamento.PRIMEIRA_CONSULTA;

        String caminhoArquivo = null;

        if (request.getArquivo() != null && !request.getArquivo().isEmpty()) {

            String nomeArquivo = UUID.randomUUID() + "_" + request.getArquivo().getOriginalFilename();

            Path pastaUploads =Paths.get("uploads");

            if (!Files.exists(pastaUploads)) {
                Files.createDirectories(pastaUploads);
            }

            Path caminhoCompleto = pastaUploads.resolve(nomeArquivo);

            Files.copy(
                    request.getArquivo().getInputStream(),
                    caminhoCompleto,
                    StandardCopyOption.REPLACE_EXISTING
            );

            caminhoArquivo = caminhoCompleto.toString();
        }

        Agendamento agendamento = new Agendamento();

        agendamento.setPaciente(paciente);
        agendamento.setClinica(EnumClinica.valueOf(request.getClinica()));
        agendamento.setData(LocalDate.parse(request.getData()));
        agendamento.setEspecialidade(especialidade);
        agendamento.setTipo(tipo);
        agendamento.setEncaminhamentoMedicoPath(caminhoArquivo);
        agendamento.setStatusAgendamento(EnumStatusAgendamento.AGUARDANDO);
        agendamento.setStatusEncaminhamento(
                caminhoArquivo == null
                        ? EnumStatusEncaminhamento.APROVADO
                        : EnumStatusEncaminhamento.AGUARDANDO
        );

        Long quantidadeDeAgendamentos = agendamentoRepository
                .countByDataAndClinicaAndEspecialidadeAndStatusAgendamentoNotAndFilaDeEspera(
                        LocalDate.parse(request.getData()),
                        EnumClinica.valueOf(request.getClinica()),
                        especialidade, EnumStatusAgendamento.CANCELADO,
                        false);
        agendamento.setFilaDeEspera(quantidadeDeAgendamentos > 3);

        return agendamentoRepository.save(agendamento);
    }

    public void deletarAgendamento(String email, Long id){
        Paciente paciente =
                pacienteRepository
                        .findByEmailIgnoreCase(email)
                        .orElseThrow();

        Agendamento agendamento =
                agendamentoRepository
                        .findById(id)
                        .orElseThrow();

        if(!agendamento.getPaciente().getId()
                .equals(paciente.getId())
        ){
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Acesso negado"
            );
        }

        verificarFilaDeEspera(agendamento);

        agendamentoRepository.delete(agendamento);

    }

    public void verificarFilaDeEspera(Agendamento agendamento){
        Long qntAgendada = agendamentoRepository
                .countByDataAndClinicaAndEspecialidadeAndStatusAgendamentoNotAndFilaDeEspera(
                        agendamento.getData(),
                        agendamento.getClinica(),
                        agendamento.getEspecialidade(),
                        EnumStatusAgendamento.CANCELADO,
                        false
                );

        System.out.println("QntAgendada: " + qntAgendada);

        Optional<Agendamento> primeiroDaFila = agendamentoRepository
                .findFirstByFilaDeEsperaAndDataAndClinicaAndEspecialidadeOrderByIdAsc(
                        true,
                        agendamento.getData(),
                        agendamento.getClinica(),
                        agendamento.getEspecialidade()
                );

        if(qntAgendada <= 4 && primeiroDaFila.isPresent()){
            primeiroDaFila.get().setFilaDeEspera(false);
            agendamentoRepository.save(primeiroDaFila.get());
        }
    }

    public void atualizarStatusAgendamento(Long id, StatusAgendamentoDTO dto) {

        Agendamento agendamento =
                agendamentoRepository
                        .findById(id)
                        .orElseThrow();

        agendamento.setStatusAgendamento(dto.getStatus());

        if (dto.getStatus().equals(EnumStatusAgendamento.CANCELADO)){
            Boolean fila = agendamento.getFilaDeEspera();
            if (fila)
                agendamento.setFilaDeEspera(false);

            verificarFilaDeEspera(agendamento);
        }


        agendamentoRepository.save(agendamento);

    }

    public void atualizarStatusEncaminhamento(Long id, EncaminhamentoDTO dto){
        Agendamento agendamento = agendamentoRepository.findById(id).orElseThrow();

        agendamento.setStatusEncaminhamento(dto.getStatus());
        agendamento.setDescricaoEncaminhamento(dto.getDescricao());

        if(dto.getStatus().equals(EnumStatusEncaminhamento.REPROVADO))
            atualizarStatusAgendamento(id, new StatusAgendamentoDTO(EnumStatusAgendamento.CANCELADO));

        if(dto.getStatus().equals(EnumStatusEncaminhamento.APROVADO) && agendamento.getStatusAgendamento().equals(EnumStatusAgendamento.CANCELADO))
            atualizarStatusAgendamento(id, new StatusAgendamentoDTO(EnumStatusAgendamento.AGUARDANDO));

        agendamentoRepository.save(agendamento);
    }

}