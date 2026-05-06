package citec.marca.services;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumTurnos;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScriptPadrao {

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    public void cadastrarDiaConsultorioPadraoCEISI(){
        List<DiaConsultorio> lista = List.of(
            //SEGUNDA
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.GO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.OTORRINO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.OFTALMO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.ENDOCRINO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.OTORRINO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEGUNDA, EnumEspecialidades.OFTALMO, EnumTurnos.TARDE),

            //TERÇA
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.TERCA, EnumEspecialidades.GO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.TERCA, EnumEspecialidades.GO, EnumTurnos.TARDE),

            //QUARTA
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUARTA, EnumEspecialidades.GO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUARTA, EnumEspecialidades.REUMATO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUARTA, EnumEspecialidades.OTORRINO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUARTA, EnumEspecialidades.OFTALMO, EnumTurnos.TARDE),

            //QUINTA
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUINTA, EnumEspecialidades.REUMATO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUINTA, EnumEspecialidades.GO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.QUINTA, EnumEspecialidades.MASTO, EnumTurnos.TARDE),

            //SEXTA
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEXTA, EnumEspecialidades.GO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEXTA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_I, EnumDiasSemana.SEXTA, EnumEspecialidades.OFTALMO, EnumTurnos.TARDE)
        );

        diaConsultorioRepository.saveAll(lista);
    }

    public void cadastrarDiaConsultorioPadraoUBS(){
        List<DiaConsultorio> lista = List.of(

            //SEGUNDA
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.SEGUNDA, EnumEspecialidades.PSIQ, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.SEGUNDA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE),

            //TERÇA
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.TERCA, EnumEspecialidades.PSIQ, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.TERCA, EnumEspecialidades.GERAL, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.TERCA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.TERCA, EnumEspecialidades.ACUPUNTURA, EnumTurnos.TARDE),
            //QUARTA
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.QUARTA, EnumEspecialidades.GASTRO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.QUARTA, EnumEspecialidades.GERAL, EnumTurnos.MANHA),

            //QUINTA

            //SEXTA
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.SEXTA, EnumEspecialidades.PSIQ, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.SEXTA, EnumEspecialidades.PEDIATRA, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UBS, EnumDiasSemana.SEXTA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE)

        );

        diaConsultorioRepository.saveAll(lista);
    }

    public void cadastrarDiaConsultorioPadraoUDA(){
        List<DiaConsultorio> lista = List.of(

            //SEGUNDA
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.SEGUNDA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE),

            //TERÇA
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.TERCA, EnumEspecialidades.GO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.TERCA, EnumEspecialidades.GO, EnumTurnos.TARDE),

            //QUARTA
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.QUARTA, EnumEspecialidades.PEDIATRA, EnumTurnos.TARDE),

            //QUINTA

            //SEXTA
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.SEXTA, EnumEspecialidades.PEDIATRA, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.UDA, EnumDiasSemana.SEXTA, EnumEspecialidades.GO, EnumTurnos.MANHA)
        );

        diaConsultorioRepository.saveAll(lista);
    }

    public void cadastrarDiaConsultorioPadraoCEISEstacioValente(){
        List<DiaConsultorio> lista = List.of(

            //SEGUNDA
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.PEDIATRA, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.URO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.CARDIO, EnumTurnos.MANHA),

            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.ORTOP, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.INFECTO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.NEURO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.ENDOCRINO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEGUNDA, EnumEspecialidades.DERMATO, EnumTurnos.TARDE),

            //TERÇA
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.GERAL, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.PSIQ, EnumTurnos.MANHA),

            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.VASCULAR, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.HEMATO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.PROCTO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.TERCA, EnumEspecialidades.HOMEOP, EnumTurnos.TARDE),

            //QUARTA
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.PEDIATRA, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.GASTRO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.CARDIO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.REUMATO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.NEURO, EnumTurnos.MANHA),

            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.PSIQ, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.NEURO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUARTA, EnumEspecialidades.GERAL, EnumTurnos.TARDE),

            //QUINTA
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUINTA, EnumEspecialidades.ORTOP, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUINTA, EnumEspecialidades.URO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUINTA, EnumEspecialidades.GERAL, EnumTurnos.MANHA),

            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUINTA, EnumEspecialidades.PEDIATRA, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.QUINTA, EnumEspecialidades.PNEUMOLOGIA, EnumTurnos.TARDE),

            //SEXTA
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.PEDIATRA, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.VASCULAR, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.GASTRO, EnumTurnos.MANHA),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.HEMATO, EnumTurnos.MANHA),

            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.PEDIATRA, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.NEURO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.REUMATO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.INFECTO, EnumTurnos.TARDE),
            new DiaConsultorio(EnumClinica.CEIS_ESTACIO, EnumDiasSemana.SEXTA, EnumEspecialidades.GASTRO, EnumTurnos.TARDE)
        );

        diaConsultorioRepository.saveAll(lista);
    }
}
