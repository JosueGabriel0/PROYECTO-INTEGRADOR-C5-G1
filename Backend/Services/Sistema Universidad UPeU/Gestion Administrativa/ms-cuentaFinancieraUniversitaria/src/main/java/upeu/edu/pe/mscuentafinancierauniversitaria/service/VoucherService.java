package upeu.edu.pe.mscuentafinancierauniversitaria.service;

import upeu.edu.pe.mscuentafinancierauniversitaria.entity.Voucher;

import java.util.List;

public interface VoucherService {
    public List<Voucher> listarTodos();
    public Voucher obtenerPorId(Long id);
    public Voucher crear(Voucher voucher);
    public Voucher actualizar(Voucher voucher);
    public void eliminar(Long id);
    public List<Voucher> obtenerPorCuentaFinanciera(Long idCuentaFinanciera);
    public List<Voucher> buscarPorCuentaYAnio(Long idCuentaFinanciera, int anio);
    public Voucher crearVoucherParaCuentaFinanciera(Long idCuentaFinanciera, Voucher voucher);
    public Voucher actualizarVoucherDeCuentaFinanciera(Long idVoucher, Voucher datosVoucherActualizados);
    public List<Voucher> buscarPorEstado(String estado);
    public Voucher actualizarEstadoVoucher(Long id, String estado);
}