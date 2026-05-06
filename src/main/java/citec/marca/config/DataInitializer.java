package citec.marca.config;

import citec.marca.repositories.tabelasAuxiliares.DiaConsultorioRepository;
import citec.marca.services.ScriptPadrao;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner init(ScriptPadrao script, DiaConsultorioRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                script.cadastrarDiaConsultorioPadraoCEISI();
                script.cadastrarDiaConsultorioPadraoUBS();
                script.cadastrarDiaConsultorioPadraoCEISEstacioValente();
                script.cadastrarDiaConsultorioPadraoUDA();
            }
        };
    }}
