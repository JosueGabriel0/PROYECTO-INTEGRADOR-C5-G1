package upeu.edu.pe.mscuentafinancierauniversitaria.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class SaldoAFavor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSaldoAFavor;

    private BigDecimal montoSaldoAFavor;

    private BigDecimal montoGastado;

    private LocalDate fechaSaldoAFavor;

    private LocalDateTime fechaCreacionSaldoAFavor;
    private LocalDateTime fechaModificacionSaldoAFavor;

    @ManyToOne
    @JoinColumn(name = "cuenta_financiera_id")
    @JsonBackReference
    private CuentaFinanciera cuentaFinanciera;

    @PrePersist
    public void onCreate(){
        fechaCreacionSaldoAFavor = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionSaldoAFavor = LocalDateTime.now();
    }
}
