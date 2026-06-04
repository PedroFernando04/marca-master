package citec.marca.config;

import citec.marca.entities.enums.EnumStatusAgendamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendamentoScheduler {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Scheduled(cron = "0 5 0 * * *")
    public void cancelarPendentes(){

        System.out.println("Scheduler executado: " + LocalDateTime.now());

        List<Agendamento> agendamentos = agendamentoRepository.findByStatusAgendamento(EnumStatusAgendamento.AGUARDANDO);

        LocalDateTime agora = LocalDateTime.now();

        for(Agendamento agendamento : agendamentos){

            LocalDateTime dataConsulta =
                    agendamento
                            .getData()
                            .atTime(0, 0);

            Duration diferenca = Duration.between(agora, dataConsulta);

            if(diferenca.toHours() < 24 && agendamento.getStatusAgendamento().equals(EnumStatusAgendamento.AGUARDANDO)){

                agendamento.setStatusAgendamento(EnumStatusAgendamento.CANCELADO);

                if (agendamento.getFilaDeEspera())
                    agendamento.setFilaDeEspera(false);

                agendamento.setDescricaoEncaminhamento("Esta consulta foi cancelada por falta de confirmação. Por favor, exclua este registro e faça o agendamento novamente.");

                agendamentoRepository.save(agendamento);
            }
        }
    }
}