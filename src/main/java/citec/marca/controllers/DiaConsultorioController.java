package citec.marca.controllers;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.entities.enums.EnumTipoFuncionario;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Usuario;
import citec.marca.services.DiaConsultorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaConsultorio")
public class DiaConsultorioController {

    @Autowired
    private DiaConsultorioService diaConsultorioService;

    @GetMapping
    public ResponseEntity<List<DiaConsultorioDTO>> listar(
            @RequestParam(required = false) String clinica,
            Authentication authentication
    ) {
        ResponseEntity<?> erro = validarResponsavel(authentication);
        if (erro != null) return ResponseEntity.status(erro.getStatusCode()).build();

        List<DiaConsultorioDTO> lista = (clinica == null || clinica.isBlank())
                ? diaConsultorioService.listarTodos()
                : diaConsultorioService.listarPorClinica(clinica);

        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}/especialidade")
    public ResponseEntity<DiaConsultorioDTO> atualizarEspecialidade(
            @PathVariable Long id,
            @RequestParam String especialidade,
            Authentication authentication
    ) {
        ResponseEntity<?> erro = validarResponsavel(authentication);
        if (erro != null) return ResponseEntity.status(erro.getStatusCode()).build();

        DiaConsultorioDTO atualizado = diaConsultorioService.atualizarEspecialidade(id, especialidade);

        return ResponseEntity.ok(atualizado);
    }

    private ResponseEntity<?> validarResponsavel(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Usuario usuario = (Usuario) authentication.getPrincipal();

        boolean ehResponsavel = usuario instanceof Funcionario funcionario
                && funcionario.getTipoFuncionario() == EnumTipoFuncionario.RESPONSAVEL;

        if (!ehResponsavel) {
            return ResponseEntity.status(403).build();
        }

        return null;
    }
}