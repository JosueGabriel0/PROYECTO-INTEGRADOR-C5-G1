package upeu.edu.pe.mscuentafinancierauniversitaria.service;

import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;

import java.util.List;

public interface SaldoAFavorService {
    public SaldoAFavor crearSaldoAFavorParaCuentaFinanciera(Long idCuentaFinanciera, SaldoAFavor saldoAFavor);
    public List<SaldoAFavor> listarSaldosAFavor();
    public SaldoAFavor buscarSaldoAFavorPorId(Long idSaldoAFavor);
    public SaldoAFavor buscarSaldoAFavorPorAnio(Integer anio);
    public SaldoAFavor actualizarSaldoAFavor(Long idSaldoAFavor, SaldoAFavor saldoAFavorActualizado);
    public void eliminarSaldoAFavorPorId(Long idSaldoAFavor);
}
