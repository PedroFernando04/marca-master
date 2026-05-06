package citec.marca.dtos.requests;

import java.util.List;

public class LiberarDiaRequest {

    private List<String> dias;
    private String clinica;

    public List<String> getDias() {
        return dias;
    }

    public void setDias(List<String> dias) {
        this.dias = dias;
    }

    public String getClinica() {
        return clinica;
    }

    public void setClinica(String clinica) {
        this.clinica = clinica;
    }
}
