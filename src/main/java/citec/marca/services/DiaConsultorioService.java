package citec.marca.services;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.dtos.records.NovoDiaConsultorioDTO;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import citec.marca.specifications.DiaConsultorioSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class DiaConsultorioService {

    private static final int TAMANHO_PAGINA = 10;

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    public Page<DiaConsultorioDTO> listar(
            String clinica,
            String diaSemana,
            String especialidade,
            int pagina
    ) {
        EnumClinica enumClinica = (clinica == null || clinica.isBlank())
                ? null : EnumClinica.valueOf(clinica.trim());

        EnumDiasSemana enumDiaSemana = (diaSemana == null || diaSemana.isBlank())
                ? null : EnumDiasSemana.valueOf(diaSemana.trim());

        EnumEspecialidades enumEspecialidade = (especialidade == null || especialidade.isBlank())
                ? null : EnumEspecialidades.valueOf(especialidade.trim());

        Specification<DiaConsultorio> spec = DiaConsultorioSpecification
                .clinicaEquals(enumClinica)
                .and(DiaConsultorioSpecification.diaSemanaEquals(enumDiaSemana))
                .and(DiaConsultorioSpecification.especialidadeEquals(enumEspecialidade));

        Pageable pageable = PageRequest.of(
                pagina,
                TAMANHO_PAGINA,
                Sort.by("clinica").ascending()
                        .and(Sort.by("diaSemana").ascending())
                        .and(Sort.by("turno").ascending())
        );

        return diaConsultorioRepository
                .findAll(spec, pageable)
                .map(this::paraDTO);
    }

    public DiaConsultorioDTO criar(NovoDiaConsultorioDTO novo) {
        DiaConsultorio diaConsultorio = new DiaConsultorio(
                EnumClinica.valueOf(novo.clinica().trim()),
                EnumDiasSemana.valueOf(novo.diaSemana().trim()),
                EnumEspecialidades.valueOf(novo.especialidade().trim()),
                EnumTurnos.valueOf(novo.turno().trim())
        );

        diaConsultorioRepository.save(diaConsultorio);

        return paraDTO(diaConsultorio);
    }

    public void excluir(Long id) {
        if (!diaConsultorioRepository.existsById(id)) {
            throw new RuntimeException("DiaConsultorio não encontrado: " + id);
        }

        diaConsultorioRepository.deleteById(id);
    }

    public DiaConsultorioDTO atualizarEspecialidade(Long id, String novaEspecialidade) {
        DiaConsultorio diaConsultorio = diaConsultorioRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("DiaConsultorio não encontrado: " + id));

        EnumEspecialidades enumEspecialidade = EnumEspecialidades.valueOf(novaEspecialidade.trim());

        diaConsultorio.setEspecialidade(enumEspecialidade);

        diaConsultorioRepository.save(diaConsultorio);

        return paraDTO(diaConsultorio);
    }

    private DiaConsultorioDTO paraDTO(DiaConsultorio d) {
        return new DiaConsultorioDTO(
                d.getId(),
                d.getClinica().name(),
                d.getClinica().getDescricao(),
                d.getDiaSemana().name(),
                d.getDiaSemana().getDescricao(),
                d.getEspecialidade().name(),
                d.getEspecialidade().getDescricao(),
                d.getTurno().name(),
                d.getTurno().getDescricao()
        );
    }
}