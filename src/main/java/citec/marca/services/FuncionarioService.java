package citec.marca.services;

import citec.marca.dtos.records.DiaLiberadoDTO;
import citec.marca.dtos.requests.LiberarDiaRequest;
import citec.marca.entities.enums.*;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.repositories.tabelasAuxiliares.DiasLiberadosRepository;
import citec.marca.repositories.tabelasPrincipais.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private DiasLiberadosRepository  diasLiberadosRepository;

    @Autowired
    private FuncionarioRepository  funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Funcionario salvarFuncionario(Funcionario funcionario){
        Optional<Funcionario> matriculaBuscado = funcionarioRepository.findByMatricula(funcionario.getMatricula());
        Optional<Funcionario> emailBuscado = funcionarioRepository.findByEmailIgnoreCase(funcionario.getEmail());

        if (matriculaBuscado.isPresent()) {
            throw new IllegalArgumentException("Matrícula já cadstrado");
        }
        if (emailBuscado.isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));

        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public void liberarDias (LiberarDiaRequest request){
        EnumClinica clinica =
                EnumClinica.valueOf(request.getClinica());

        LocalDate dia0 = LocalDate.parse(request.getDias().get(0));
        Integer ano = dia0.getYear();
        Integer mes = dia0.getMonthValue();

        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        diasLiberadosRepository.deleteByClinicaAndDataBetween(clinica, inicio, fim);

        for (String d : request.getDias()) {

            LocalDate data = LocalDate.parse(d);

            boolean existe = diasLiberadosRepository
                    .findByDataAndClinica(data, clinica)
                    .isPresent();

            if (!existe) {
                DiasLiberados dia = new DiasLiberados();
                dia.setData(data);
                dia.setClinica(clinica);

                diasLiberadosRepository.save(dia);
            }
        }
    }

    public List<DiaLiberadoDTO> buscarDiasLiberadosClinica(String clinica, Integer mes, Integer ano){
        EnumClinica cli = EnumClinica.valueOf(clinica);

        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        return diasLiberadosRepository
                .findByClinicaAndDataBetween(cli, inicio, fim)
                .stream()
                .map(d -> new DiaLiberadoDTO(
                        d.getData().toString(),
                        d.getTurnoManha(),
                        d.getTurnoTarde()
                ))
                .toList();
    }

    @Transactional
    public void atualizarTurno(String clinica, String data, Boolean turnoManha, Boolean turnoTarde) {
        EnumClinica cli = EnumClinica.valueOf(clinica);
        LocalDate dataConvertida = LocalDate.parse(data);

        DiasLiberados dia = diasLiberadosRepository
                .findByDataAndClinica(dataConvertida, cli)
                .orElseThrow(() -> new IllegalArgumentException("Dia não encontrado"));

        if (!turnoManha && !turnoTarde) {
            diasLiberadosRepository.delete(dia);
        } else {
            dia.setTurnoManha(turnoManha);
            dia.setTurnoTarde(turnoTarde);
            diasLiberadosRepository.save(dia);
        }
    }
}
