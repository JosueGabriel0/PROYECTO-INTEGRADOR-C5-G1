package upeu.edu.pe.mscuentafinancierauniversitaria.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.MovimientoAcademico;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.CuentaFinancieraRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.MovimientoAcademicoRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.SaldoAFavorRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.CuentaFinancieraService;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.MovimientoAcademicoService;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.SaldoAFavorService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class CuentaFinancieraServiceImpl implements CuentaFinancieraService {
    @Autowired
    private CuentaFinancieraRepository cuentaFinancieraRepository;
    @Autowired
    private SaldoAFavorRepository saldoAFavorRepository;
    @Autowired
    private MovimientoAcademicoService movimientoAcademicoService;
    @Autowired
    private SaldoAFavorService saldoAFavorService;

    @Override
    public List<CuentaFinanciera> listarTodos() {
        return cuentaFinancieraRepository.findAll();
    }

    @Override
    public CuentaFinanciera obtenerPorId(Long id) {
        return cuentaFinancieraRepository.findById(id).get();
    }

    @Override
    public CuentaFinanciera crear(CuentaFinanciera cuentaFinanciera) {
        return cuentaFinancieraRepository.save(cuentaFinanciera);
    }

    @Override
    public CuentaFinanciera actualizar(CuentaFinanciera cuentaFinanciera) {
        return cuentaFinancieraRepository.save(cuentaFinanciera);
    }

    @Override
    public void eliminar(Long id) {
        cuentaFinancieraRepository.deleteById(id);
    }

    @Override
    public CuentaFinanciera buscarPorVoucher(Long id){
        return cuentaFinancieraRepository.findByVouchersIdVoucher(id);
    }

    @Transactional
    @Override
    public void actualizarSaldoAFavorPorAnio(Long cuentaFinancieraId, Integer anio) {
        List<MovimientoAcademico> movimientos = movimientoAcademicoService.buscarPorCuentaYAnio(cuentaFinancieraId, anio);

        BigDecimal totalDebito = movimientos.stream()
                .map(mov -> new BigDecimal(mov.getDebito()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCredito = movimientos.stream()
                .map(mov -> new BigDecimal(mov.getCredito()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Obtener SaldoAFavor correspondiente
        SaldoAFavor saldoAFavor = saldoAFavorService.buscarPorCuentaYAnio(cuentaFinancieraId, anio);

        if (saldoAFavor == null) {
            // Crear un nuevo SaldoAFavor si no existe
            saldoAFavor = new SaldoAFavor();
            saldoAFavor.setCuentaFinanciera(cuentaFinancieraRepository.findById(cuentaFinancieraId).orElseThrow());
            saldoAFavor.setFechaSaldoAFavor(LocalDate.of(anio, 1, 1));
        }

        // Actualizar el montoSaldoAFavor
        saldoAFavor.setMontoSaldoAFavor(totalCredito);
        saldoAFavor.setMontoGastado(totalDebito);

        // Guardar el SaldoAFavor
        saldoAFavorRepository.save(saldoAFavor);
    }
}
