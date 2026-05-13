package citec.marca.dtos.requests;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AgendarConsultaRequest {

    private String clinica;

    private String data;

    private String especialidade;

    private Long pacienteId;

    private MultipartFile arquivo;
}