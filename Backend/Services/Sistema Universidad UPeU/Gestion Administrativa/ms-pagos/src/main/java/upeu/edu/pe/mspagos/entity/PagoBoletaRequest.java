package upeu.edu.pe.mspagos.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PagoBoletaRequest {
    private Pago pago;
    private Boleta boleta;
}
