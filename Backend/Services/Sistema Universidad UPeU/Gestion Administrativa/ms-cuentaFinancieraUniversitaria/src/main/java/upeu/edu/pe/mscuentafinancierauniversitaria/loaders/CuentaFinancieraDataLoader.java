package upeu.edu.pe.mscuentafinancierauniversitaria.loaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.MovimientoAcademico;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.Voucher;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.CuentaFinancieraRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class CuentaFinancieraDataLoader implements CommandLineRunner {

    private final CuentaFinancieraRepository cuentaFinancieraRepository;

    public CuentaFinancieraDataLoader(CuentaFinancieraRepository cuentaFinancieraRepository) {
        this.cuentaFinancieraRepository = cuentaFinancieraRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen registros en CuentaFinanciera
        if (cuentaFinancieraRepository.count() == 0) {
            // Crear CuentaFinanciera 1 con movimientos
            CuentaFinanciera cuenta1 = new CuentaFinanciera();
            cuenta1.setEntidad("Entidad A");
            cuenta1.setDepartamento("Departamento X");
            cuenta1.setAnio(LocalDate.of(2023, 12, 31));
            cuenta1.setSumasDebito(10000.0);
            cuenta1.setSumasCredito(8000.0);
            cuenta1.setSaldoFinalDebito(2000.0);
            cuenta1.setSaldoFinalCredito(0.0);

            MovimientoAcademico movimiento1 = new MovimientoAcademico();
            movimiento1.setFecha(LocalDate.of(2023, 12, 1));
            movimiento1.setVoucher(12345);
            movimiento1.setLote("Lote-001");
            movimiento1.setDocumento("Doc-12345");
            movimiento1.setMovimiento("Pago matrícula");
            movimiento1.setDescripcion("Pago de matrícula universitaria");
            movimiento1.setDebito("500.00");
            movimiento1.setCredito("0.00");
            movimiento1.setIdPago(1L);
            movimiento1.setCuentaFinanciera(cuenta1);

            MovimientoAcademico movimiento2 = new MovimientoAcademico();
            movimiento2.setFecha(LocalDate.of(2023, 12, 15));
            movimiento2.setVoucher(12346);
            movimiento2.setLote("Lote-002");
            movimiento2.setDocumento("Doc-12346");
            movimiento2.setMovimiento("Pago curso");
            movimiento2.setDescripcion("Pago por curso adicional");
            movimiento2.setDebito("0.00");
            movimiento2.setCredito("300.00");
            movimiento2.setIdPago(1L);
            movimiento2.setCuentaFinanciera(cuenta1);

            Voucher voucher1 = new Voucher();
            voucher1.setNombreBanco("Ninguno");
            voucher1.setNumeroDeOperacion("12345");
            voucher1.setFechaDeOperacion(LocalDate.of(2023, 12, 1));
            voucher1.setImporte(BigDecimal.valueOf(1000.00));
            voucher1.setEstado("REGISTRADO");
            voucher1.setVoucherURL("Voucher1.png");
            voucher1.setCuentaFinanciera(cuenta1);

            SaldoAFavor saldoAFavor1 = new SaldoAFavor();
            saldoAFavor1.setMontoSaldoAFavor(BigDecimal.ZERO);
            saldoAFavor1.setFechaSaldoAFavor(LocalDate.of(2025, 1, 1));
            saldoAFavor1.setCuentaFinanciera(cuenta1);


            cuenta1.setMovimientosAcademicos(List.of(movimiento1, movimiento2));
            cuenta1.setVouchers(List.of(voucher1));
            cuenta1.setSaldosAFavor(List.of(saldoAFavor1));

            // Crear CuentaFinanciera 2 con movimientos
            CuentaFinanciera cuenta2 = new CuentaFinanciera();
            cuenta2.setEntidad("Entidad B");
            cuenta2.setDepartamento("Departamento Y");
            cuenta2.setAnio(LocalDate.of(2024, 12, 31));
            cuenta2.setSumasDebito(15000.0);
            cuenta2.setSumasCredito(14000.0);
            cuenta2.setSaldoFinalDebito(1000.0);
            cuenta2.setSaldoFinalCredito(0.0);

            MovimientoAcademico movimiento3 = new MovimientoAcademico();
            movimiento3.setFecha(LocalDate.of(2025, 1, 5));
            movimiento3.setVoucher(12347);
            movimiento3.setLote("Lote-003");
            movimiento3.setDocumento("Doc-12347");
            movimiento3.setMovimiento("Pago especial");
            movimiento3.setDescripcion("Pago por programa especial");
            movimiento3.setDebito("700.00");
            movimiento3.setCredito("0.00");
            movimiento3.setIdPago(1L);
            movimiento3.setCuentaFinanciera(cuenta2);

            Voucher voucher2 = new Voucher();
            voucher2.setNombreBanco("Ninguno");
            voucher2.setNumeroDeOperacion("12345");
            voucher2.setFechaDeOperacion(LocalDate.of(2023, 12, 1));
            voucher2.setImporte(BigDecimal.valueOf(1000.00));
            voucher2.setEstado("REGISTRADO");
            voucher2.setVoucherURL("Voucher1.png");
            voucher2.setCuentaFinanciera(cuenta2);

            SaldoAFavor saldoAFavor2 = new SaldoAFavor();
            saldoAFavor2.setMontoSaldoAFavor(BigDecimal.ZERO);
            saldoAFavor2.setFechaSaldoAFavor(LocalDate.of(2025, 1, 1));
            saldoAFavor2.setCuentaFinanciera(cuenta2);

            cuenta2.setMovimientosAcademicos(List.of(movimiento3));
            cuenta2.setVouchers(List.of(voucher2));
            cuenta2.setSaldosAFavor(List.of(saldoAFavor2));

            // Guardar en la base de datos
            cuentaFinancieraRepository.saveAll(List.of(cuenta1, cuenta2));
            System.out.println("Cuentas financieras y sus movimientos cargados en la base de datos.");
        } else {
            System.out.println("Las cuentas financieras ya están cargadas en la base de datos.");
        }
    }
}