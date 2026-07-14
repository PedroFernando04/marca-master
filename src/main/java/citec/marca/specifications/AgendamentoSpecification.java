package citec.marca.specifications;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.enums.EnumStatusAgendamento;
import citec.marca.entities.enums.EnumStatusEncaminhamento;
import citec.marca.entities.tabelasAuxiliares.Agendamento;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class AgendamentoSpecification {

    public static Specification<Agendamento> clinicaEquals(EnumClinica clinica) {
        return (root, query, cb) -> {
            if (clinica == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("clinica"), clinica);
        };
    }


    public static Specification<Agendamento> especialidadeEquals(EnumEspecialidades especialidade) {
        return (root, query, cb) ->
                cb.equal(root.get("especialidade"), especialidade);
    }

    public static Specification<Agendamento> statusEncaminhamentoEquals(EnumStatusEncaminhamento status) {
        return (root, query, cb) ->
                cb.equal(root.get("statusEncaminhamento"), status);
    }

    public static Specification<Agendamento> statusAgendamentoEquals(EnumStatusAgendamento status) {
        return (root, query, cb) ->
                cb.equal(root.get("statusAgendamento"), status);
    }

    public static Specification<Agendamento> dataEquals(LocalDate data) {
        return (root, query, cb) ->
                cb.equal(root.get("data"), data);
    }

    public static Specification<Agendamento> filaDeEsperaEquals(Boolean filaDeEspera) {
        return (root, query, cb) ->
                cb.equal(root.get("filaDeEspera"), filaDeEspera);
    }
}