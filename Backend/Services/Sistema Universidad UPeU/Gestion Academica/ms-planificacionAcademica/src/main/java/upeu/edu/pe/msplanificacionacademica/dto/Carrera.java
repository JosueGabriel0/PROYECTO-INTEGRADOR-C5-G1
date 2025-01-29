package upeu.edu.pe.msplanificacionacademica.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class Carrera {
    private Long idCarrera;

    private String codigo;
    private String nombre;
    private String descripcion;
    private int duracion; //Duracion en años
    private List<Long> cursos = new ArrayList<>();
    private List<Long> planificacionesAcademicas =  new ArrayList<>();

    private LocalDateTime fechaCreacionCarrera;
    private LocalDateTime fechaModificacionCarrera;
}