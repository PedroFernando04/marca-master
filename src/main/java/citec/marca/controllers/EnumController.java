    package citec.marca.controllers;

    import citec.marca.dtos.enums.ClinicaDTO;
    import citec.marca.dtos.enums.EspecialidadeDTO;
    import citec.marca.dtos.enums.StatusEncaminhamentoDTO;
    import citec.marca.dtos.enums.TipoFuncionarioDTO;
    import citec.marca.entities.enums.EnumClinica;
    import citec.marca.entities.enums.EnumEspecialidades;
    import citec.marca.entities.enums.EnumStatusEncaminhamento;
    import citec.marca.entities.enums.EnumTipoFuncionario;
    import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import java.util.Arrays;
    import java.util.Comparator;
    import java.util.List;

    @RestController
    @RequestMapping("/api/enum")
    public class EnumController {

        @Autowired
        private DiaConsultorioRepository diaConsultorioRepository;

        @GetMapping("/especialidades")
        public List<EspecialidadeDTO> listarEspecialidades() {
            return Arrays.stream(EnumEspecialidades.values())
                    .sorted(Comparator.comparing(EnumEspecialidades::getDescricao))
                    .map(e -> new EspecialidadeDTO(e.name(), e.getDescricao()))
                    .toList();
        }

        @GetMapping("/especialidades/{clinica}")
        public List<EspecialidadeDTO> listarEspecialidadesPorClinica(
                @PathVariable String clinica
        ) {
            System.out.println("RAW CLINICA: [" + clinica + "]");

            EnumClinica enumClinica = EnumClinica.valueOf(clinica.trim());

            return diaConsultorioRepository
                    .findDistinctEspecialidadesByClinica(enumClinica)
                    .stream()
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

        @GetMapping("/clinicas/clinico-geral")
        public List<ClinicaDTO> listarClinicasComClinicoGeral() {

            return diaConsultorioRepository
                    .findClinicasComClinicoGeral()
                    .stream()
                    .sorted(Comparator.comparing(EnumClinica::getDescricao))
                    .map(c -> new ClinicaDTO(
                            c.name(),
                            c.getDescricao(),
                            c.getEndereco()
                    ))
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
