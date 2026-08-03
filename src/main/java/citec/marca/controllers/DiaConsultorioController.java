package citec.marca.controllers;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.dtos.requests.DiaConsultorioRequest;
import citec.marca.services.DiaConsultorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/diaConsultorio")
public class DiaConsultorioController {

    @Autowired
    private DiaConsultorioService diaConsultorioService;

    @GetMapping
    public ResponseEntity<List<DiaConsultorioDTO>> listar() {
        return ResponseEntity.ok(diaConsultorioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(diaConsultorioService.buscarPorId(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody DiaConsultorioRequest request) {
        try {
            DiaConsultorioDTO criado = diaConsultorioService.salvar(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(criado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody DiaConsultorioRequest request) {
        try {
            DiaConsultorioDTO atualizado = diaConsultorioService.atualizar(id, request);
            return ResponseEntity.ok(atualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            diaConsultorioService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}