package upeu.edu.pe.msinscripciones.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
public class EstudianteRequest {

    //Persona
    private long id;

    private String nombres;
    private String apellido_paterno;
    private String apellido_materno;
    private LocalDate fecha_nacimiento;
    private String genero;
    private String nacionalidad;
    private String tipoDocumento;
    private String numeroDocumento;
    private String direccion;
    private String ciudad;
    private String departamento;
    private String pais;
    private String provincia;
    private String telefono;
    private String email;
    private String estadoCivil;
    private String fotoPerfil;
    private String tipoSangre;
    private String contactoEmergenciaNombre;
    private String contactoEmergenciaTelefono;
    private String contactoEmergenciaEmail;
    private String contactoEmergenciaDireccion;
    private String contactoEmergenciaCiudad;
    private String contactoEmergenciaParentesco;
    private LocalDateTime fechaRegistro;

    private LocalDateTime fechaCreacionPersona;
    private LocalDateTime fechaModificacionPersona;

    //Estudiante
    private long idEstudiante;

    private long idPersona;
    private String matricula;
    private int cicloActual;
    private double promedioGeneral;
    private LocalDate fechaIngreso;

    @Enumerated(EnumType.STRING)
    private EstadoEstudiante estado;

    private String tipoEstudiante;
    private String beca;
    private String numeroMatricula;

    //Referencia a otro microservicio
    private Long carreraId;

    private List<String> asignaturasMatriculadas = new ArrayList<>();

    private String horario;

    private String consejeroAcademico;
    private String fechaGraduacion;

    private List<String> practicasRealizadas = new ArrayList<>();

    // Historial Académico del Estudiante
    private List<RegistroAcademico> historialAcademico;

    private long idCurso;

    private Persona persona;

    private LocalDateTime fechaCreacionEstudiante;
    private LocalDateTime fechaModificacionEstudiante;
}
