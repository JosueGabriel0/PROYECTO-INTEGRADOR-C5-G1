package upeu.edu.pe.mspagos.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PagoFacturaRequest {
    private Pago pago;
    private Factura factura;
}
