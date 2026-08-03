package citec.marca.services;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.dtos.requests.DiaConsultorioRequest;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DiaConsultorioService {

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    public List<DiaConsultorioDTO> listarTodos() {
        return diaConsultorioRepository.findAll()
                .stream()
                .sorted(
                        Comparator.comparing((DiaConsultorio d) -> d.getClinica().getDescricao())
                                .thenComparing(d -> d.getEspecialidade().getDescricao())
                                .thenComparing(d -> d.getDiaSemana().ordinal())
                                .thenComparing(d -> d.getTurno().getDescricao())
                )
                .map(this::toDTO)
                .toList();
    }

    public DiaConsultorioDTO buscarPorId(Long id) {
        DiaConsultorio diaConsultorio = diaConsultorioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Registro não encontrado."));

        return toDTO(diaConsultorio);
    }

    public DiaConsultorioDTO salvar(DiaConsultorioRequest request) {
        EnumClinica clinica = EnumClinica.valueOf(request.getClinica());
        EnumDiasSemana diaSemana = EnumDiasSemana.valueOf(request.getDiaSemana());
        EnumEspecialidades especialidade = EnumEspecialidades.valueOf(request.getEspecialidade());
        EnumTurnos turno = EnumTurnos.valueOf(request.getTurno());

        boolean jaExiste = diaConsultorioRepository
                .existsByClinicaAndDiaSemanaAndEspecialidadeAndTurno(clinica, diaSemana, especialidade, turno);

        if (jaExiste) {
            throw new IllegalArgumentException(
                    "Já existe um atendimento cadastrado para essa clínica, dia, especialidade e turno."
            );
        }

        DiaConsultorio diaConsultorio = new DiaConsultorio(clinica, diaSemana, especialidade, turno);

        return toDTO(diaConsultorioRepository.save(diaConsultorio));
    }

    public DiaConsultorioDTO atualizar(Long id, DiaConsultorioRequest request) {
        DiaConsultorio diaConsultorio = diaConsultorioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Registro não encontrado."));

        EnumClinica clinica = EnumClinica.valueOf(request.getClinica());
        EnumDiasSemana diaSemana = EnumDiasSemana.valueOf(request.getDiaSemana());
        EnumEspecialidades especialidade = EnumEspecialidades.valueOf(request.getEspecialidade());
        EnumTurnos turno = EnumTurnos.valueOf(request.getTurno());

        boolean jaExiste = diaConsultorioRepository
                .existsByClinicaAndDiaSemanaAndEspecialidadeAndTurnoAndIdNot(
                        clinica, diaSemana, especialidade, turno, id
                );

        if (jaExiste) {
            throw new IllegalArgumentException(
                    "Já existe um atendimento cadastrado para essa clínica, dia, especialidade e turno."
            );
        }

        diaConsultorio.setClinica(clinica);
        diaConsultorio.setDiaSemana(diaSemana);
        diaConsultorio.setEspecialidade(especialidade);
        diaConsultorio.setTurno(turno);

        return toDTO(diaConsultorioRepository.save(diaConsultorio));
    }

    public void deletar(Long id) {
        if (!diaConsultorioRepository.existsById(id)) {
            throw new NoSuchElementException("Registro não encontrado.");
        }

        diaConsultorioRepository.deleteById(id);
    }

    private DiaConsultorioDTO toDTO(DiaConsultorio d) {
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