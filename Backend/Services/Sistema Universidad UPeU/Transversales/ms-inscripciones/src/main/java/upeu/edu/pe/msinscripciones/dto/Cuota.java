package upeu.edu.pe.msinscripciones.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class Cuota {

    private Long idCuota;

    private PlanDePago planDePago;

    private Integer numeroCuota;

    private BigDecimal monto;

    private LocalDate fechaVencimiento;

    private String estadoCuota;
}