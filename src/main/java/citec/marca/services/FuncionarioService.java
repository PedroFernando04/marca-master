package citec.marca.services;

import citec.marca.dtos.requests.LiberarDiaRequest;
import citec.marca.entities.enums.EnumEspecialidades;
import citec.marca.entities.tabelasAuxiliares.DiasLiberados;
import citec.marca.entities.tabelasPrincipais.Funcionario;
import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.repositories.tabelasAuxiliares.DiasLiberadosRepository;
import citec.marca.repositories.tabelasPrincipais.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
            throw new IllegalArgumentException("CPF já cadstrado");
        }
        if (emailBuscado.isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));

        return funcionarioRepository.save(funcionario);
    }

    public void liberarDias (LiberarDiaRequest request){
        EnumEspecialidades especialidade =
                EnumEspecialidades.valueOf(request.getEspecialidade());

        for (String d : request.getDias()) {

            LocalDate data = LocalDate.parse(d);


            boolean existe = diasLiberadosRepository
                    .findByDataAndEspecialidade(data, especialidade)
                    .isPresent();

            if (!existe) {
                DiasLiberados dia = new DiasLiberados();
                dia.setData(data);
                dia.setEspecialidade(especialidade);

                diasLiberadosRepository.save(dia);
            }
        }
    }
}
