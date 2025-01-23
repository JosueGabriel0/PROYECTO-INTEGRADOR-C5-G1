package upeu.edu.pe.mspagos.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PagoRequest {
    private Pago pago;
    private Boleta boleta;
    private Factura factura;
}
