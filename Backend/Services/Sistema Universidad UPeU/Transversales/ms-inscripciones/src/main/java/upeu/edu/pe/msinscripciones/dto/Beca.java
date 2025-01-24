package upeu.edu.pe.msinscripciones.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Beca {
    private Long idBeca;

    private String tipoBeca; // Ejemplo: Beca completa, media beca
    private BigDecimal montoDescuento;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private Long idEstudiante;
    private Estudiante estudiante;
    // Getters y setters
}