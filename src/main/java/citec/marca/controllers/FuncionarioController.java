package citec.marca.controllers;

import citec.marca.dtos.requests.AgendarConsultaRequest;
import citec.marca.dtos.requests.LiberarDiaRequest;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.services.EncaixeConsultaService;
import citec.marca.services.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/api/funcionario")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private EncaixeConsultaService encaixeConsultaService;

    @PostMapping("/liberarDias")
    public ResponseEntity<?> salvar(@RequestBody LiberarDiaRequest request) {

        funcionarioService.liberarDias(request);

        System.out.println(request.getDias());
        System.out.println(request.getClinica());

        return ResponseEntity.ok("Dias salvos com sucesso");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Funcionario> cadastrarPaciente (@RequestBody Funcionario funcionario){

        Funcionario userCriado = funcionarioService.salvarFuncionario(funcionario);

        return ResponseEntity.status(201).body(userCriado);
    }

    @PostMapping("/encaixarConsulta")
    public ResponseEntity<?> encaixarConsulta(@ModelAttribute AgendarConsultaRequest request, Authentication authentication) throws IOException{

        encaixeConsultaService.encaixarConsulta(request, authentication.getName());

        return ResponseEntity.status(201).body("Consulta encaixado.");
    }
}
