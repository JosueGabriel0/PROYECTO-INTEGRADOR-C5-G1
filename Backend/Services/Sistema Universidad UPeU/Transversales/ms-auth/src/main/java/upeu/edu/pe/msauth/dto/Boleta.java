package upeu.edu.pe.msauth.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Boleta {
    private Long idBoleta;

    private Pago pago; // Relación con el pago asociado

    private String numeroBoleta;
    private LocalDate fechaEmision;
    private String descripcion;
    private BigDecimal impuestos;
    private BigDecimal subtotal;
    private BigDecimal total;
    private String tipoDocumento; // DNI, RUC, etc.

    private Long idEstudiante;
    private Estudiante estudiante;

    // Getters y setters
}