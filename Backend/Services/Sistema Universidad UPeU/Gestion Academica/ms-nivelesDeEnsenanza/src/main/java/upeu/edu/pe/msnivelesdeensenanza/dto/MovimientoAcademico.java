package upeu.edu.pe.msnivelesdeensenanza.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MovimientoAcademico {
    private Long idMovimientoAcademico;

    private LocalDate fecha;
    private int voucher;
    private String lote;
    private String documento;
    private String movimiento;
    private String descripcion;
    private String debito;
    private String credito;

    private Long idPago;
    private Pago pago;

    private CuentaFinanciera cuentaFinanciera;
}
