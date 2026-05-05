package citec.marca.controllers;

import citec.marca.dtos.EspecialidadeDTO;
import citec.marca.entities.enums.EnumEspecialidades;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class GeralController {

    @GetMapping("/especialidades")
    public List<EspecialidadeDTO> listarEspecialidades() {
        return Arrays.stream(EnumEspecialidades.values())
                .map(e -> new EspecialidadeDTO(e.name(), e.getDescricao()))
                .toList();
    }

}
