package citec.marca.specifications;

import citec.marca.entities.enums.EnumClinica;
import citec.marca.entities.enums.EnumDiasSemana;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.DiaConsultorio;

import org.springframework.data.jpa.domain.Specification;

public class DiaConsultorioSpecification {

    public static Specification<DiaConsultorio> clinicaEquals(EnumClinica clinica) {
        return (root, query, cb) -> {
            if (clinica == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("clinica"), clinica);
        };
    }

    public static Specification<DiaConsultorio> diaSemanaEquals(EnumDiasSemana diaSemana) {
        return (root, query, cb) -> {
            if (diaSemana == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("diaSemana"), diaSemana);
        };
    }

    public static Specification<DiaConsultorio> especialidadeEquals(EnumEspecialidades especialidade) {
        return (root, query, cb) -> {
            if (especialidade == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("especialidade"), especialidade);
        };
    }
}