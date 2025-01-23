package upeu.edu.pe.mscuentafinancierauniversitaria.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.CuentaFinancieraRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.SaldoAFavorRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.SaldoAFavorService;

import java.time.LocalDate;
import java.util.List;

@Service
public class SaldoAFavorServiceImpl implements SaldoAFavorService {

    @Autowired
    CuentaFinancieraRepository cuentaFinancieraRepository;
    @Autowired
    SaldoAFavorRepository saldoAFavorRepository;

    @Override
    public SaldoAFavor crearSaldoAFavorParaCuentaFinanciera(Long idCuentaFinanciera, SaldoAFavor saldoAFavor) {
        CuentaFinanciera cuentaFinancieraEncontrada = cuentaFinancieraRepository.findById(idCuentaFinanciera).orElseThrow(() -> new IllegalArgumentException("Cuenta Financiera con ID " + idCuentaFinanciera + " no encontrada"));
        saldoAFavor.setCuentaFinanciera(cuentaFinancieraEncontrada);
        SaldoAFavor nuevoSaldoAFavor = saldoAFavorRepository.save(saldoAFavor);
        return nuevoSaldoAFavor;
    }

    @Override
    public List<SaldoAFavor> listarSaldosAFavor() {
        return saldoAFavorRepository.findAll();
    }

    @Override
    public SaldoAFavor buscarSaldoAFavorPorId(Long idSaldoAFavor) {
        return saldoAFavorRepository.findById(idSaldoAFavor).orElseThrow(() -> new IllegalArgumentException("Saldo A Favor con ID " + idSaldoAFavor + " no encontrado"));
    }

    @Override
    public SaldoAFavor buscarSaldoAFavorPorAnio(Integer anio) {
        LocalDate startDate = LocalDate.of(anio, 1, 1);
        LocalDate endDate = LocalDate.of(anio, 12, 31);
        SaldoAFavor saldoAFavorEncontrado = saldoAFavorRepository.getSaldoAFavorByAnioSaldoAFavorBetween(startDate, endDate);
        return saldoAFavorEncontrado;
    }

    @Override
    public SaldoAFavor actualizarSaldoAFavor(Long idSaldoAFavor, SaldoAFavor saldoAFavorActualizado) {
        SaldoAFavor saldoAFavorExistente = saldoAFavorRepository.findById(idSaldoAFavor).orElseThrow(() -> new IllegalArgumentException("Saldo A Favor con ID " + idSaldoAFavor + " no encontrado"));
        saldoAFavorExistente.setMontoSaldoAFavor(saldoAFavorActualizado.getMontoSaldoAFavor());
        saldoAFavorExistente.setAnioSaldoAFavor(saldoAFavorActualizado.getAnioSaldoAFavor());

        SaldoAFavor ActualizacionSaldoAFavor = saldoAFavorRepository.save(saldoAFavorExistente);
        return ActualizacionSaldoAFavor;
    }

    @Override
    public void eliminarSaldoAFavorPorId(Long idSaldoAFavor) {
        saldoAFavorRepository.deleteById(idSaldoAFavor);
    }
}
