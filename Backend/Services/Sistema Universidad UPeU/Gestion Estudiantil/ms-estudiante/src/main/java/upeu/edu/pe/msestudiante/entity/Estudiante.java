package upeu.edu.pe.msestudiante.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import upeu.edu.pe.msestudiante.dto.CuentaFinanciera;
import upeu.edu.pe.msestudiante.dto.MovimientoAcademico;
import upeu.edu.pe.msestudiante.dto.Persona;
import upeu.edu.pe.msestudiante.dto.PlanificacionAcademica;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data

public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstudiante;

    private String codigoUniversitario;
    private String matricula;
    private int cicloActual;
    private double promedioGeneral;
    private LocalDate fechaIngreso;

    @Enumerated(EnumType.STRING)
    private EstadoEstudiante estado;

    private String tipoEstudiante;
    private String beca;
    private String numeroMatricula;

    private Long idCuentaFinanciera;
    @Transient
    private CuentaFinanciera cuentaFinanciera;

    @ElementCollection
    @CollectionTable(name = "carreras_ingresadas_ids", joinColumns = @JoinColumn(name = "estudiante_id"))
    @Column(name = "carreras_ids")
    private List<Long> carrerasIngresadasIds = new ArrayList<Long>();

    @ElementCollection
    @CollectionTable(name = "asignaturas_matriculadas", joinColumns = @JoinColumn(name = "estudiante_id"))
    @Column(name = "asignaturas")
    private List<String> asignaturasMatriculadas = new ArrayList<String>();

    @Lob
    private String horario;

    private String consejeroAcademico;
    private LocalDate fechaGraduacion;

    @ElementCollection
    @CollectionTable(name = "practicas_realizadas", joinColumns = @JoinColumn(name = "estudiante_id"))
    @Column(name = "practicas")
    private List<String> practicasRealizadas = new ArrayList<String>();

    // Historial Académico del Estudiante
    @OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<RegistroAcademico> historialAcademico;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idResponsableFinanciero", referencedColumnName = "idResponsableFinanciero")
    @JsonManagedReference
    private ResponsableFinanciero responsableFinanciero;

    private long idPersona;
    @Transient
    private Persona persona;

    private Long idPLanificacionAcademica;
    @Transient
    private PlanificacionAcademica planificacionAcademica;

    private LocalDateTime fechaCreacionEstudiante;
    private LocalDateTime fechaModificacionEstudiante;

    @PrePersist
    public void onCreate(){
        fechaCreacionEstudiante = java.time.LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        fechaModificacionEstudiante = java.time.LocalDateTime.now();
    }
}