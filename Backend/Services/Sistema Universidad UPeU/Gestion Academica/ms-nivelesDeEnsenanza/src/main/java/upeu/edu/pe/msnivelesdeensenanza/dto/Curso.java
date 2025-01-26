package upeu.edu.pe.msnivelesdeensenanza.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Curso {
    private Long idCurso;

    private String nombre;
    private String codigo;
    private String descripcion;
    private int creditos;
    private int horasTeoricas;
    private int horasPracticas;
    private String tipo;
    private String nivel;

    private Long idCarrera;
    private Carrera carrera;

    private String preRequisito;

    private String silaboUrl;

    private LocalDateTime fechaCreacionCurso;
    private LocalDateTime fechaModificacionCurso;
}