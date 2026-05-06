package citec.marca.controllers;

import citec.marca.dtos.requests.LiberarDiaRequest;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.services.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/funcionario")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

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
}
