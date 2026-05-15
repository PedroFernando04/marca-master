package citec.marca.controllers;

import citec.marca.entities.tabelasPrincipais.Paciente;
import citec.marca.entities.tabelasPrincipais.Usuario;
import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import citec.marca.services.PacienteService;
import citec.marca.services.ScriptPadrao;
import citec.marca.services.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private DiaConsultorioRepository diaConsultorioRepository;

    @Autowired
    private ScriptPadrao  scriptPadrao;

    @PostMapping("/entrar")
    public ResponseEntity<Usuario> entrar(@RequestBody Usuario usuarioDigitado,
                         SecurityContext currentContext,
                         HttpServletRequest request,
                         HttpServletResponse response) {

        Usuario usuarioEncontrado = usuarioService.getUsuarioByEmail(usuarioDigitado.getEmail());

        if (usuarioEncontrado  == null || !usuarioService.verifyPassword(usuarioDigitado.getSenha(), usuarioEncontrado.getPassword())) {
            return ResponseEntity.status(401).body(usuarioDigitado);
        }

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(usuarioEncontrado, null, authorities);

        currentContext.setAuthentication(authentication);

        SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
        securityContextRepository.saveContext(currentContext, request, response);

        return ResponseEntity.status(200).body(usuarioEncontrado);
    }

    @GetMapping("/usuarioLogado")
    public ResponseEntity<Usuario> usuarioLogado(Authentication authentication){

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuarioLogado);
    }

    @PostMapping("/logout")
    public ResponseEntity<Usuario> logout(HttpServletRequest request, HttpServletResponse response){

        request.getSession(false).invalidate();

        return ResponseEntity.noContent().build();
    }
}
