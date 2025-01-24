package upeu.edu.pe.msestudiante.dto;

import lombok.Data;
import upeu.edu.pe.msestudiante.entity.Estudiante;

import java.time.LocalDateTime;

@Data
public class ResponsableFinanciero {
    private Long idResponsableFinanciero;

    private String nombres;
    private String apellido_paterno;
    private String apellido_materno;
    private String correoElectronico;
    private String celular;
    private String direccion;
    private String parentesco;
    private String nacionalidad;
    private String tipoDocumento;
    private String numeroDocumento;

    private Estudiante estudiante;

    private LocalDateTime fechaCreacionResponsableFinanciero;
    private LocalDateTime fechaModificacionResponsableFinanciero;
}
