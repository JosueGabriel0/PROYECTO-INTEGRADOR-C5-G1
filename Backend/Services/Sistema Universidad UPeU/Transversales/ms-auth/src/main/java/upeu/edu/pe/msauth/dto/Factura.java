package upeu.edu.pe.msauth.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Factura {
    private Long idFactura;

    private Pago pago; // Relación con el pago

    private String numeroFactura;
    private LocalDate fechaEmision;
    private String descripcion;
    private BigDecimal impuestos;
    private BigDecimal subtotal;
    private BigDecimal total;
    private String estadoFactura;

    private Long idEstudiante;
    private Estudiante estudiante;

    // Getters y setters
}