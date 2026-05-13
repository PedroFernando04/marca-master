package citec.marca.controllers;

import citec.marca.dtos.requests.AgendarConsultaRequest;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.services.AgendamentoService;
import citec.marca.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Paciente> cadastrarPaciente (@RequestBody Paciente paciente){
        Paciente userCriado = pacienteService.salvarPaciente(paciente);
        return ResponseEntity.status(201).body(userCriado);
    }

    @PostMapping("/agendar")
    public ResponseEntity<String> agendarConsulta(
            @ModelAttribute AgendarConsultaRequest request
    ) throws IOException {

        agendamentoService.agendarConsulta(
                request
        );

        return ResponseEntity.ok(
                "Consulta agendada com sucesso!"
        );
    }
}
