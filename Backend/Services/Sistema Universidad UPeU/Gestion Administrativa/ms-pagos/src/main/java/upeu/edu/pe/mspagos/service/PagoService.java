package upeu.edu.pe.mspagos.service;

import upeu.edu.pe.mspagos.entity.*;

import java.util.List;

public interface PagoService {
    public Pago guardarPago(Pago pago);

    public Pago editarPago(Pago pago);

    public List<Pago> listarPago();

    public Pago buscarPagoPorId(Long id);

    public PagoBoletaRequest crearPagoConBoleta(PagoBoletaRequest pagoBoletaRequest);

    public PagoFacturaRequest crearPagoConFactura(PagoFacturaRequest pagoFacturaRequest);

    public PagoRequest actualizarPagoConComprobante(Long idPago, PagoRequest pagoRequest);

    public void eliminarPago(Long id);
}
