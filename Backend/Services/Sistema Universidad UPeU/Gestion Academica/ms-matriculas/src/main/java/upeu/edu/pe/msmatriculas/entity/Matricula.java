package upeu.edu.pe.msmatriculas.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import upeu.edu.pe.msmatriculas.dto.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "matricula")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Long idMatricula;

    private Long idNivelEnsenanza;
    @Transient
    private NivelEnsenanza nivelEnsenanza;

    private Long idOpcionNivel;
    @Transient
    private OpcionNivel opcionNivel;

    private Long idEstudiante;
    @Transient
    private Estudiante estudiante;

    private Long idCarrera;
    @Transient
    private Carrera carrera;

    private Long idCalendarioAcademico;
    @Transient
    private CalendarioAcademico calendarioAcademico;

    private Long IdPago;
    @Transient
    private Pago pago;

    private Long idRequisito;
    @Transient
    private Requisito requisito;

    private Long idAdministrativo;
    @Transient
    private Administrativo administrativo;

    private String tipoAlumno; //Regular o Irregular

    private int numeroDeCreditos;

    private int horas;

    private BigDecimal costoMatricula;
    private BigDecimal costoEnsenanza;

    private double costoTotal;

    private Long idCiclo;
    @Transient
    private Ciclo ciclo;

    @ElementCollection
    @CollectionTable(name = "cursosDetalles_Ids", joinColumns = @JoinColumn(name = "matricula_id"))
    @Column(name = "cursosDetalleIds")
    private List<Long> cursosDetalleIds = new ArrayList<>();

    // Estado de la matrícula (pendiente, pagado, completado, cancelado)
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoMatricula estado;

    // Fecha y hora de la matrícula
    @Column(name = "fecha_matricula", nullable = false)
    private LocalDate fechaMatricula;

    // Observaciones o notas adicionales sobre la matrícula
    @Column(name = "observaciones")
    private String observaciones;

    private LocalDateTime fechaCreacionMatricula;
    private LocalDateTime fechaModificacionMatricula;

    @PrePersist
    public void onCreate() {
        fechaCreacionMatricula = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        fechaModificacionMatricula = LocalDateTime.now();
    }
}