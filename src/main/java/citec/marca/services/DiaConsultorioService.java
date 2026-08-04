package citec.marca.services;

import citec.marca.dtos.records.DiaConsultorioDTO;
import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaConsultorioService {

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    public List<DiaConsultorioDTO> listarTodos() {
        return diaConsultorioRepository
                .findAllByOrderByClinicaAscDiaSemanaAscTurnoAsc()
                .stream()
                .map(this::paraDTO)
                .toList();
    }

    public List<DiaConsultorioDTO> listarPorClinica(String clinica) {
        EnumClinica enumClinica = EnumClinica.valueOf(clinica.trim());

        return diaConsultorioRepository
                .findByClinicaOrderByDiaSemanaAscTurnoAsc(enumClinica)
                .stream()
                .map(this::paraDTO)
                .toList();
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