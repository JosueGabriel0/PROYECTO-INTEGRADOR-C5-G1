package upeu.edu.pe.mscuentafinancierauniversitaria.listener;

import org.springframework.context.ApplicationEvent;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.MovimientoAcademico;

public class MovimientoAcademicoCreadoEvent extends ApplicationEvent {

    private final MovimientoAcademico movimientoAcademico;

    public MovimientoAcademicoCreadoEvent(Object source, MovimientoAcademico movimientoAcademico) {
        super(source);
        this.movimientoAcademico = movimientoAcademico;
    }

    public MovimientoAcademico getMovimientoAcademico() {
        return movimientoAcademico;
    }
}