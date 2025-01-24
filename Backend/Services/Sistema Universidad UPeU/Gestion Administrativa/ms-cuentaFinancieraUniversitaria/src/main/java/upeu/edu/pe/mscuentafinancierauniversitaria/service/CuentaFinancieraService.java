package upeu.edu.pe.mscuentafinancierauniversitaria.service;

import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;

import java.util.List;

public interface CuentaFinancieraService {
    public List<CuentaFinanciera> listarTodos();
    public CuentaFinanciera obtenerPorId(Long id);
    public CuentaFinanciera crear(CuentaFinanciera cuentaFinanciera);
    public CuentaFinanciera actualizar(CuentaFinanciera cuentaFinanciera);
    public void eliminar(Long id);
    public CuentaFinanciera buscarPorVoucher(Long id);
    public void actualizarSaldoAFavorPorAnio(Long cuentaFinancieraId, Integer anio);
}
