package citec.marca.controllers;

import citec.marca.services.FuncionarioService;
import citec.marca.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/diasLiberados")
public class DiasLiberadosController {
    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/especialidade")
    public ResponseEntity<List<String>> listarDiasLiberadosEspecialidade(
            @RequestParam(required = false) String clinica,
            @RequestParam(required = false) String especialidade,
            @RequestParam Integer mes,
            @RequestParam Integer ano
    ) {
        List<String> dias = pacienteService.buscarDiasLiberadosEspecialidade(clinica, especialidade, mes, ano);

        return ResponseEntity.ok(dias);
    }

    @GetMapping("/clinica")
    public ResponseEntity<List<String>> listarDiasLiberadosClinica(
            @RequestParam String clinica,
            @RequestParam Integer mes,
            @RequestParam Integer ano
    ) {
        List<String> dias = funcionarioService.buscarDiasLiberadosClinica(clinica, mes, ano);
        return ResponseEntity.ok(dias);
    }
}
