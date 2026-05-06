package citec.marca.services;

import citec.marca.entities.tabelasAuxiliares.Agendamento;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import citec.marca.repositories.tabelasAuxiliares.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public void registrarAgendamento(Agendamento agendamento) {
        agendamentoRepository.save(agendamento);
    }
}
