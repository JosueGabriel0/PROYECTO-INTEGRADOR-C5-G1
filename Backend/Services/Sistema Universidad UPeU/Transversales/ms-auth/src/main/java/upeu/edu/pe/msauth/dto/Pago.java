package upeu.edu.pe.msauth.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Pago {
    private Long idPago;

    private BigDecimal monto;
    private String moneda;
    private String metodoPago; // Ejemplo: Tarjeta, Efectivo, Transferencia
    private String medioDePago; // Al contado o 5 cuotas
    private String descripcion;
    private String estado; // Pagado, Pendiente, Fallido, etc.

    private Long idEstudiante;
    private Estudiante estudiante;

    private LocalDate fechaPago;

    // Relación con factura si es necesario
    private Factura factura;

    // Relación con boleta
    private Boleta boleta;


    // Getters y setters
}