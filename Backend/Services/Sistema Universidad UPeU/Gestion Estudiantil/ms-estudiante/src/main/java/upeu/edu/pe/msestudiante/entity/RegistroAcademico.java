package upeu.edu.pe.msestudiante.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data

public class RegistroAcademico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    @JsonBackReference
    private Estudiante estudiante;

    @ElementCollection
    @CollectionTable(name = "cursos_Ids", joinColumns = @JoinColumn(name = "estudiante_id"))
    @Column(name = "cursosIds")
    private List<Long> cursos = new ArrayList<>();

    private String nombreCurso;

    private Double calificacion;

    private LocalDate fechaFinalizacion;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;

    @PrePersist
    public void onCreate(){
        fechaCreacion = java.time.LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacion = java.time.LocalDateTime.now();
    }
}
