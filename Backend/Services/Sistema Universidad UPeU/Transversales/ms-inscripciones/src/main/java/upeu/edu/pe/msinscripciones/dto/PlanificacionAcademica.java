package upeu.edu.pe.msinscripciones.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PlanificacionAcademica {

    private Long idPlanificacionAcademica;

    private String nombrePlanEstudio;
    private String codigoPlanEstudio;
    private String versionPlanEstudio;
    private LocalDateTime fechaCreacionPlanificacionAcademica;
    private LocalDateTime fechaModificacionPlanificacionAcademica;

    private EstadoPlanificacion estado; //Activo, Inactivo o En revision

    private String descripcionGeneral;

    private List<Long> cursosProgramadosIds;

    private List<Ciclo> ciclos; // Lista de ciclos en la planificación académica

    private List<Long> calendarioAcademicoIds;
}
