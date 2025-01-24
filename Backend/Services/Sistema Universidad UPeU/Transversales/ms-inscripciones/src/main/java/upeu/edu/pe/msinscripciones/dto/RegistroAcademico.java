package upeu.edu.pe.msinscripciones.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class RegistroAcademico {

    private Long id;

    private Estudiante estudiante;

    private List<Long> cursos = new ArrayList<>();

    private String nombreCurso;

    private Double calificacion;

    private LocalDate fechaFinalizacion;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
}
