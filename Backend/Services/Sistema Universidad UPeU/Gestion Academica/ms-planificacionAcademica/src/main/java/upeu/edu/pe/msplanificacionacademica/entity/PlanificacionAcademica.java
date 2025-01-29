package upeu.edu.pe.msplanificacionacademica.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import upeu.edu.pe.msplanificacionacademica.dto.Carrera;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class PlanificacionAcademica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlanificacionAcademica;

    private String nombrePlanEstudio;
    private String codigoPlanEstudio;
    private String versionPlanEstudio;
    private String semestre;
    private String modo;//Regular
    private LocalDateTime fechaCreacionPlanificacionAcademica;
    private LocalDateTime fechaModificacionPlanificacionAcademica;

    private Long idCarrera;
    @Transient
    private Carrera carrera;

    @Enumerated(EnumType.STRING)
    private EstadoPlanificacion estado; //Activo, Inactivo o En revision

    @Lob
    private String descripcionGeneral;

    // Lista de IDs de cursos programados (referencia al microservicio de Curso)
    @ElementCollection
    @CollectionTable(name = "planificacion_cursos", joinColumns = @JoinColumn(name = "planificacion_academica_id"))
    @Column(name = "curso_programado_id")
    private List<Long> cursosProgramadosIds;

    @OneToMany(mappedBy = "planificacionAcademica", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Ciclo> ciclos; // Lista de ciclos en la planificación académica

    // Lista de IDs de eventos importantes del calendario académico (referencia al microservicio de Calendario Académico)
    @ElementCollection
    @CollectionTable(name = "planificacion_calendario", joinColumns = @JoinColumn(name = "planificacion_academica_id"))
    @Column(name = "evento_calendario_id")
    private List<Long> calendarioAcademicoIds;


    @PrePersist
    public void onCreate(){
        fechaCreacionPlanificacionAcademica = java.time.LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionPlanificacionAcademica = java.time.LocalDateTime.now();
    }
}
