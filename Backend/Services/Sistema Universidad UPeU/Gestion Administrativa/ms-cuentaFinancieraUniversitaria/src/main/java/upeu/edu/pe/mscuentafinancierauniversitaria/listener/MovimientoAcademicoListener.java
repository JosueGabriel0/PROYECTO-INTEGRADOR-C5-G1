package upeu.edu.pe.mscuentafinancierauniversitaria.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.MovimientoAcademico;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.CuentaFinancieraService;

@Component
public class MovimientoAcademicoListener implements ApplicationListener<MovimientoAcademicoCreadoEvent> {

    private final CuentaFinancieraService cuentaFinancieraService;

    public MovimientoAcademicoListener(CuentaFinancieraService cuentaFinancieraService) {
        this.cuentaFinancieraService = cuentaFinancieraService;
    }

    @Override
    public void onApplicationEvent(MovimientoAcademicoCreadoEvent event) {
        MovimientoAcademico movimientoAcademico = event.getMovimientoAcademico();

        if (movimientoAcademico.getCuentaFinanciera() != null) {
            cuentaFinancieraService.actualizarSaldoAFavorPorAnio(
                    movimientoAcademico.getCuentaFinanciera().getIdCuentaFinanciera(),
                    movimientoAcademico.getFecha().getYear()
            );
        }
    }
}