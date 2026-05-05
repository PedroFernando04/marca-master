package citec.marca.dtos.requests;

import java.util.List;

public class LiberarDiaRequest {

    private List<String> dias;
    private String especialidade;

    public List<String> getDias() {
        return dias;
    }

    public void setDias(List<String> dias) {
        this.dias = dias;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
