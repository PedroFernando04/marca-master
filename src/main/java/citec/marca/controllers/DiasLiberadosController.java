package citec.marca.controllers;

import citec.marca.dtos.records.DiaAgendaDTO;
import citec.marca.dtos.records.DiaLiberadoDTO;
import citec.marca.services.FuncionarioService;
import citec.marca.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diasLiberados")
public class DiasLiberadosController {
    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/especialidade")
    public ResponseEntity<List<DiaAgendaDTO>> listarDiasLiberadosEspecialidade(
            @RequestParam(required = false) String clinica,
            @RequestParam(required = false) String especialidade,
            @RequestParam Integer mes,
            @RequestParam Integer ano
    ) {
        List<DiaAgendaDTO> dias = pacienteService.buscarDiasLiberadosEspecialidade(clinica, especialidade, mes, ano);

        return ResponseEntity.ok(dias);
    }

    @GetMapping("/clinica")
    public ResponseEntity<List<DiaLiberadoDTO>> listarDiasLiberadosClinica(
            @RequestParam String clinica,
            @RequestParam Integer mes,
            @RequestParam Integer ano
    ) {
        List<DiaLiberadoDTO> dias = funcionarioService.buscarDiasLiberadosClinica(clinica, mes, ano);
        return ResponseEntity.ok(dias);
    }

    @PutMapping("/turno")
    public ResponseEntity<Void> atualizarTurno(
            @RequestParam String clinica,
            @RequestParam String data,
            @RequestParam Boolean turnoManha,
            @RequestParam Boolean turnoTarde
    ) {
        funcionarioService.atualizarTurno(clinica, data, turnoManha, turnoTarde);
        return ResponseEntity.ok().build();
    }
}
