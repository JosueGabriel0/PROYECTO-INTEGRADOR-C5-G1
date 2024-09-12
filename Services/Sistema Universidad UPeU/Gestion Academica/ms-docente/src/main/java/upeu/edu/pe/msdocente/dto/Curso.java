package upeu.edu.pe.msdocente.dto;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data

public class Curso {
    private long idCurso;

    private String nombre;
    private String codigo;
    private String descripcion;
    private int creditos;
    private String tipo;
    private String nivel;

    @ElementCollection
    @CollectionTable(name = "asignaturas", joinColumns = @JoinColumn(name = "curso_id"))
    @Column(name = "asignatura")
    private List<String> asignaturas = new ArrayList<>();

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaModificacion;

}
