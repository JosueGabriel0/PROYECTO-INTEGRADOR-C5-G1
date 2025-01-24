package upeu.edu.pe.msauth.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Ciclo {

    private Long idCiclo;

    private int numeroCiclo; // Por ejemplo, 1, 2, ..., 10

    private EstadoCiclo estado; // Activo o Cerrado (opcional)

    private PlanificacionAcademica planificacionAcademica;

    private List<Long> cursosIds;

    private LocalDateTime fechaCreacionCiclo;
    private LocalDateTime fechaModificacionCiclo;
}