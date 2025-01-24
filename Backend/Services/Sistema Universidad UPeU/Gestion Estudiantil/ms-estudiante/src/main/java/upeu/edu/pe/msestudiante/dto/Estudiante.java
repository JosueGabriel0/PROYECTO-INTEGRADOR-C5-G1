package upeu.edu.pe.msestudiante.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data

public class Estudiante {
    private Long idEstudiante;

    private String codigoUniversitario;
    private String matricula;
    private int cicloActual;
    private double promedioGeneral;
    private LocalDate fechaIngreso;

    private EstadoEstudiante estado;

    private String tipoEstudiante;
    private String beca;
    private String numeroMatricula;

    private Long idCuentaFinanciera;
    private CuentaFinanciera cuentaFinanciera;

    private List<Long> carrerasIngresadasIds = new ArrayList<Long>();

    private List<String> asignaturasMatriculadas = new ArrayList<String>();

    private String horario;

    private String consejeroAcademico;
    private LocalDate fechaGraduacion;

    private List<String> practicasRealizadas = new ArrayList<String>();

    private List<RegistroAcademico> historialAcademico;

    private ResponsableFinanciero responsableFinanciero;

    private long idPersona;
    private Persona persona;

    private Long idPLanificacionAcademica;
    private PlanificacionAcademica planificacionAcademica;

    private LocalDateTime fechaCreacionEstudiante;
    private LocalDateTime fechaModificacionEstudiante;
}