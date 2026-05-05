package citec.marca.services;

import citec.marca.entities.tabelasPrincipais.Usuario;
import citec.marca.repositories.tabelasPrincipais.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean verifyPassword(String senhaDigitada, String senhaCriptografada){
        return passwordEncoder.matches(senhaDigitada, senhaCriptografada);
    }

    public Usuario getUsuarioByEmail(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(usuario.isPresent()){
            return usuario.get();
        } else {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
    }
}
