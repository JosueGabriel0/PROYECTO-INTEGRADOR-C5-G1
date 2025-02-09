package upeu.edu.pe.mscuentafinancierauniversitaria.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.CuentaFinancieraRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.SaldoAFavorRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.SaldoAFavorService;

import java.math.BigDecimal;
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
    public SaldoAFavor buscarPorCuentaYAnio(Long idCuentaFinanciera, Integer anio) {
        LocalDate startDate = LocalDate.of(anio, 1, 1);
        LocalDate endDate = LocalDate.of(anio, 12, 31);
        List<SaldoAFavor> saldosAFavorEncontrados = saldoAFavorRepository.findByCuentaFinancieraIdCuentaFinancieraAndFechaSaldoAFavorBetween(idCuentaFinanciera, startDate, endDate);
        SaldoAFavor saldoAFavorEncontrado = saldosAFavorEncontrados.get(saldosAFavorEncontrados.size() - 1);
        return saldoAFavorEncontrado;
    }

    @Override
    public SaldoAFavor actualizarSaldoAFavor(Long idSaldoAFavor, SaldoAFavor saldoAFavorActualizado) {
        SaldoAFavor saldoAFavorExistente = saldoAFavorRepository.findById(idSaldoAFavor).orElseThrow(() -> new IllegalArgumentException("Saldo A Favor con ID " + idSaldoAFavor + " no encontrado"));
        saldoAFavorExistente.setMontoSaldoAFavor(saldoAFavorActualizado.getMontoSaldoAFavor());
        saldoAFavorExistente.setFechaSaldoAFavor(saldoAFavorActualizado.getFechaSaldoAFavor());

        SaldoAFavor ActualizacionSaldoAFavor = saldoAFavorRepository.save(saldoAFavorExistente);
        return ActualizacionSaldoAFavor;
    }

    @Override
    public void eliminarSaldoAFavorPorId(Long idSaldoAFavor) {
        saldoAFavorRepository.deleteById(idSaldoAFavor);
    }

    @Override
    public SaldoAFavor restarSaldoAFavorAcuentaFinanciera(Long idCuentaFinanciera, BigDecimal valor) {
        List<SaldoAFavor> saldosAFavorEncontrados = saldoAFavorRepository.findByCuentaFinancieraIdCuentaFinanciera(idCuentaFinanciera);

        if (saldosAFavorEncontrados.isEmpty()) {
            throw new RuntimeException("No se encontraron saldos a favor para la cuenta financiera con ID " + idCuentaFinanciera);
        }

        SaldoAFavor saldoAFavorAnterior = saldosAFavorEncontrados.get(saldosAFavorEncontrados.size() - 1);

        if (saldoAFavorAnterior.getMontoSaldoAFavor().compareTo(valor) < 0) {
            throw new RuntimeException("Saldo insuficiente en la cuenta financiera con ID " + idCuentaFinanciera +
                    ". Saldo actual: " + saldoAFavorAnterior.getMontoSaldoAFavor() + ", intento de resta: " + valor);
        }

        CuentaFinanciera cuentaFinanciera = cuentaFinancieraRepository.findById(idCuentaFinanciera)
                .orElseThrow(() -> new RuntimeException("La cuenta financiera con ID " + idCuentaFinanciera + " no encontrada"));

        SaldoAFavor nuevoSaldoAFavor = new SaldoAFavor();
        nuevoSaldoAFavor.setCuentaFinanciera(cuentaFinanciera);
        nuevoSaldoAFavor.setFechaSaldoAFavor(LocalDate.now());
        nuevoSaldoAFavor.setMontoSaldoAFavor(saldoAFavorAnterior.getMontoSaldoAFavor().subtract(valor));
        nuevoSaldoAFavor.setMontoGastado(saldoAFavorAnterior.getMontoGastado());

        // Guardar y retornar el nuevo saldo
        return saldoAFavorRepository.save(nuevoSaldoAFavor);
    }
}