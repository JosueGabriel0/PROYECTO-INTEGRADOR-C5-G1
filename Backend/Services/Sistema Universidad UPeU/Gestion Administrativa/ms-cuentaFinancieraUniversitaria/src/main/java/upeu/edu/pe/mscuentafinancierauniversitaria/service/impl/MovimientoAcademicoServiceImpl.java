package upeu.edu.pe.mscuentafinancierauniversitaria.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.mscuentafinancierauniversitaria.dto.Pago;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.CuentaFinanciera;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.MovimientoAcademico;
import upeu.edu.pe.mscuentafinancierauniversitaria.exception.ResourceNotFoundException;
import upeu.edu.pe.mscuentafinancierauniversitaria.feign.PagoFeign;
import upeu.edu.pe.mscuentafinancierauniversitaria.listener.MovimientoAcademicoCreadoEvent;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.CuentaFinancieraRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.repository.MovimientoAcademicoRepository;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.MovimientoAcademicoService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoAcademicoServiceImpl implements MovimientoAcademicoService {

    @Autowired
    private CuentaFinancieraRepository cuentaFinancieraRepository;
    @Autowired
    private MovimientoAcademicoRepository movimientoAcademicoRepository;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private PagoFeign pagoFeign;

    @Override
    public List<MovimientoAcademico> listarTodos() {
        List<MovimientoAcademico> movimientosAcademicos = movimientoAcademicoRepository.findAll();

        movimientosAcademicos.forEach(movimientoAcademico -> {
            try {
                ResponseEntity<Pago> pagoResponse = pagoFeign.listarPagoDtoPorId(movimientoAcademico.getIdPago());
                if(pagoResponse.getBody() == null){
                    throw new ResourceNotFoundException("Pago con ID "+ movimientoAcademico.getIdPago() + " no existe");
                }
                movimientoAcademico.setPago(pagoResponse.getBody());
            } catch (FeignException e){
                throw new RuntimeException("Error al obtener el pago con ID " + movimientoAcademico.getIdPago() + e);
            }
        });

        return movimientosAcademicos;
    }

    @Override
    public MovimientoAcademico obtenerPorId(Long id) {
        MovimientoAcademico movimientoAcademico = movimientoAcademicoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movimiento Academico con ID " + id + " no existe"));

        try {
            ResponseEntity<Pago> pagoResponse = pagoFeign.listarPagoDtoPorId(movimientoAcademico.getIdPago());
            if(pagoResponse.getBody() == null){
                throw new ResourceNotFoundException("Pago con ID "+ movimientoAcademico.getIdPago() + " no existe");
            }
            movimientoAcademico.setPago(pagoResponse.getBody());
        } catch (FeignException e){
            throw new RuntimeException("Error al obtener el pago con ID " + movimientoAcademico.getIdPago() + e);
        }

        return movimientoAcademico;
    }

    @Override
    public MovimientoAcademico crear(MovimientoAcademico movimientoAcademico) {
        return movimientoAcademicoRepository.save(movimientoAcademico);
    }

    @Override
    public MovimientoAcademico actualizar(MovimientoAcademico movimientoAcademico) {
        return movimientoAcademicoRepository.save(movimientoAcademico);
    }

    @Override
    public void eliminar(Long id) {
        movimientoAcademicoRepository.deleteById(id);
    }

    @Override
    public List<MovimientoAcademico> obtenerPorCuentaFinanciera(Long idCuentaFinanciera){
        return movimientoAcademicoRepository.findByCuentaFinancieraIdCuentaFinanciera(idCuentaFinanciera);
    }

    @Override
    public List<MovimientoAcademico> buscarPorCuentaYAnio(Long idCuentaFinanciera, int anio){
        LocalDate startDate = LocalDate.of(anio, 1, 1);
        LocalDate endDate = LocalDate.of(anio, 12, 31);
        return movimientoAcademicoRepository.findByCuentaFinancieraIdCuentaFinancieraAndFechaBetween(idCuentaFinanciera, startDate, endDate);
    }

    @Override
    public MovimientoAcademico crearMovimientoAcademicoParaCuentaFinanciera(Long idCuentaFinanciera, MovimientoAcademico movimientoAcademico) {
        // Buscar la cuenta financiera por ID
        Optional<CuentaFinanciera> cuentaFinancieraOptional = cuentaFinancieraRepository.findById(idCuentaFinanciera);

        if (cuentaFinancieraOptional.isPresent()) {
            CuentaFinanciera cuentaFinanciera = cuentaFinancieraOptional.get();

            // Asociar el voucher con la cuenta financiera
            movimientoAcademico.setCuentaFinanciera(cuentaFinanciera);

            MovimientoAcademico savedMovimiento = movimientoAcademicoRepository.save(movimientoAcademico);

            eventPublisher.publishEvent(new MovimientoAcademicoCreadoEvent(this, savedMovimiento));
            // Guardar el movimiento academico
            return savedMovimiento;
        } else {
            throw new RuntimeException("Movimiento Academico no encontrado con el ID: " + idCuentaFinanciera);
        }
    }
}
