package citec.marca.services;

import citec.marca.dtos.requests.AgendarConsultaRequest;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTipoAgendamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class AgendamentoService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public void agendarConsulta(
            AgendarConsultaRequest request
    ) throws IOException {

        Paciente paciente =
                pacienteRepository.findById(
                        request.getPacienteId()
                ).orElseThrow();

        EnumEspecialidades especialidade =
                EnumEspecialidades.valueOf(
                        request.getEspecialidade()
                );

        boolean jaExiste =
                agendamentoRepository
                        .existsByPacienteAndEspecialidade(
                                paciente,
                                especialidade
                        );

        EnumTipoAgendamento tipo =
                jaExiste
                        ? EnumTipoAgendamento.RETORNO
                        : EnumTipoAgendamento.PRIMEIRA_CONSULTA;

        String caminhoArquivo = null;

        if (
                request.getArquivo() != null &&
                        !request.getArquivo().isEmpty()
        ) {

            String nomeArquivo =
                    UUID.randomUUID()
                            + "_"
                            + request.getArquivo().getOriginalFilename();

            Path pastaUploads =
                    Paths.get("uploads");

            if (!Files.exists(pastaUploads)) {
                Files.createDirectories(pastaUploads);
            }

            Path caminhoCompleto =
                    pastaUploads.resolve(nomeArquivo);

            Files.copy(
                    request.getArquivo().getInputStream(),
                    caminhoCompleto,
                    StandardCopyOption.REPLACE_EXISTING
            );

            caminhoArquivo =
                    caminhoCompleto.toString();
        }

        Agendamento agendamento =
                new Agendamento();

        agendamento.setPaciente(paciente);

        agendamento.setClinica(
                EnumClinica.valueOf(
                        request.getClinica()
                )
        );

        agendamento.setData(
                LocalDate.parse(
                        request.getData()
                )
        );

        agendamento.setEspecialidade(
                especialidade
        );

        agendamento.setTipo(
                tipo
        );

        agendamento.setEncaminhamentoMedicoPath(
                caminhoArquivo
        );

        agendamentoRepository.save(
                agendamento
        );
    }
}