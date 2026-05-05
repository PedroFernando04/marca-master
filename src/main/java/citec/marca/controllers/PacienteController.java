package citec.marca.controllers;

import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Paciente> cadastrarPaciente (@RequestBody Paciente paciente){
        Paciente userCriado = pacienteService.salvarPaciente(paciente);
        return ResponseEntity.status(201).body(userCriado);
    }
}
