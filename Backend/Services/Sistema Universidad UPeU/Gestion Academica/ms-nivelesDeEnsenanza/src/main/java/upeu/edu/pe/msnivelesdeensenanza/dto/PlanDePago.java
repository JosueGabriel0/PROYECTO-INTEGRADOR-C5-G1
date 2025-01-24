package upeu.edu.pe.msnivelesdeensenanza.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class PlanDePago {

    private Long idPlanPago;

    private String nombre;

    private String descripcion;

    private BigDecimal montoTotal;

    private List<Cuota> cuotas = new ArrayList<>();

    private Integer numeroCuotas;

    private BigDecimal montoPorCuota;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;
}