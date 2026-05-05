package citec.marca.services;

import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public void registrarAgendamento(Agendamento agendamento) {
        agendamentoRepository.save(agendamento);
    }
}
