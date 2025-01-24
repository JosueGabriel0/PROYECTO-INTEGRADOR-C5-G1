package upeu.edu.pe.msauth.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CuentaFinanciera {
    private Long idCuentaFinanciera;

    private String entidad;
    private String departamento;
    private LocalDate anio;
    private double sumasDebito;
    private double sumasCredito;
    private double saldoFinalDebito;
    private double saldoFinalCredito;
    private double saldoAfavor;

    private List<MovimientoAcademico> movimientosAcademicos;
}
