package citec.marca.controllers;

import citec.marca.dtos.enums.ClinicaDTO;
import citec.marca.dtos.enums.EspecialidadeDTO;
import citec.marca.dtos.enums.StatusEncaminhamentoDTO;
import citec.marca.dtos.enums.TipoFuncionarioDTO;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusEncaminhamento;
import citec.marca.entities.enums.EnumTipoFuncionario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/enum")
public class EnumController {

    @GetMapping("/especialidades")
    public List<EspecialidadeDTO> listarEspecialidades() {
        return Arrays.stream(EnumEspecialidades.values())
                .sorted(Comparator.comparing(EnumEspecialidades::getDescricao))
                .map(e -> new EspecialidadeDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/clinicas")
    public List<ClinicaDTO> listarClinicas() {
        return Arrays.stream(EnumClinica.values())
                .sorted(Comparator.comparing(EnumClinica::getDescricao))
                .map(e -> new ClinicaDTO(e.name(), e.getDescricao(), e.getEndereco()))
                .toList();
    }

    @GetMapping("/tiposFuncionario")
    public List<TipoFuncionarioDTO> listarTiposFuncionario() {
        return Arrays.stream(EnumTipoFuncionario.values())
                .sorted(Comparator.comparing(EnumTipoFuncionario::getDescricao))
                .map(e -> new TipoFuncionarioDTO(e.name(), e.getDescricao()))
                .toList();
    }

    @GetMapping("/statusEncaminhamento")
    public List<StatusEncaminhamentoDTO>
    listarStatusEncaminhamento() {

        return Arrays.stream(
                        EnumStatusEncaminhamento.values()
                )
                .sorted(Comparator.comparing(
                        EnumStatusEncaminhamento::getDescricao
                ))
                .map(e -> new StatusEncaminhamentoDTO(
                        e.name(),
                        e.getDescricao()
                ))
                .toList();
    }
}
