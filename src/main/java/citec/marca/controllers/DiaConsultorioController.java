package citec.marca.controllers;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.dtos.records.NovoDiaConsultorioDTO;
import citec.marca.entities.enums.EnumTipoFuncionario;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Usuario;
import citec.marca.services.DiaConsultorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/diaConsultorio")
public class DiaConsultorioController {

    @Autowired
    private DiaConsultorioService diaConsultorioService;

    @GetMapping
    public ResponseEntity<Page<DiaConsultorioDTO>> listar(
            @RequestParam(required = false) String clinica,
            @RequestParam(required = false) String diaSemana,
            @RequestParam(required = false) String especialidade,
            @RequestParam(defaultValue = "0") int pagina,
            Authentication authentication
    ) {
        ResponseEntity<?> erro = validarResponsavel(authentication);
        if (erro != null) return ResponseEntity.status(erro.getStatusCode()).build();

        Page<DiaConsultorioDTO> resultado =
                diaConsultorioService.listar(clinica, diaSemana, especialidade, pagina);

        return ResponseEntity.ok(resultado);
    }

    @PostMapping
    public ResponseEntity<DiaConsultorioDTO> criar(
            @RequestBody NovoDiaConsultorioDTO novoDiaConsultorio,
            Authentication authentication
    ) {
        ResponseEntity<?> erro = validarResponsavel(authentication);
        if (erro != null) return ResponseEntity.status(erro.getStatusCode()).build();

        DiaConsultorioDTO criado = diaConsultorioService.criar(novoDiaConsultorio);

        return ResponseEntity.ok(criado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            Authentication authentication
    ) {
        ResponseEntity<?> erro = validarResponsavel(authentication);
        if (erro != null) return ResponseEntity.status(erro.getStatusCode()).build();

        diaConsultorioService.excluir(id);

        return ResponseEntity.noContent().build();
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