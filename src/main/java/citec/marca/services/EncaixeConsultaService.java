package citec.marca.services;

import citec.marca.dtos.requests.AgendarConsultaRequest;
import citec.marca.entities.enums.EnumStatusEncaminhamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasAuxiliares.EncaixeConsulta;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import citec.marca.repositories.tabelasAuxiliares.EncaixeConsultaRepository;
import citec.marca.repositories.tabelasPrincipais.FuncionarioRepository;
import citec.marca.repositories.tabelasPrincipais.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class EncaixeConsultaService {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private EncaixeConsultaRepository encaixeConsultaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public void encaixarConsulta(AgendarConsultaRequest request, String emailFuncionario) throws IOException{
        Agendamento agendamento = agendamentoService.agendarConsulta(request);

        Funcionario funcionarioId = funcionarioRepository.findByEmailIgnoreCase(emailFuncionario).orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        EncaixeConsulta encaixeConsulta = new EncaixeConsulta();
        encaixeConsulta.setAgendamentoId(agendamento);
        encaixeConsulta.setFuncionarioId(funcionarioId);
        encaixeConsulta.setLog(LocalDateTime.now());

        encaixeConsultaRepository.save(encaixeConsulta);
    }
}
