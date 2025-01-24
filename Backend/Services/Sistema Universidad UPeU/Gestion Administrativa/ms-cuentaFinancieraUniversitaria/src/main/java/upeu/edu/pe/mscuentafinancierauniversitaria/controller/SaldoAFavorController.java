package upeu.edu.pe.mscuentafinancierauniversitaria.controller;

import feign.Body;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.SaldoAFavor;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.SaldoAFavorService;

import java.util.List;

@RestController
@RequestMapping("/saldoAFavor")
public class SaldoAFavorController {
    @Autowired
    private SaldoAFavorService saldoAFavorService;

    @PostMapping("/cuentaFinanciera/{idCuentaFinanciera}")
    public ResponseEntity<SaldoAFavor> crearSaldoAFavorParaCuentaFinanciera(@PathVariable Long idCuentaFinanciera, @RequestBody SaldoAFavor saldoAFavor){
        SaldoAFavor saldoAFavorCreado = saldoAFavorService.crearSaldoAFavorParaCuentaFinanciera(idCuentaFinanciera, saldoAFavor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saldoAFavorCreado);
    }

    @GetMapping
    public ResponseEntity<List<SaldoAFavor>> listarSaldosAFavor(){
        List<SaldoAFavor> saldosAFavor = saldoAFavorService.listarSaldosAFavor();
        return ResponseEntity.status(HttpStatus.OK).body(saldosAFavor);
    }

    @GetMapping("/{idSaldoAFavor}")
    public ResponseEntity<SaldoAFavor> buscarSaldoAFavorPorId(@PathVariable Long idSaldoAFavor){
        SaldoAFavor saldoAFavorEncontrado = saldoAFavorService.buscarSaldoAFavorPorId(idSaldoAFavor);
        return ResponseEntity.status(HttpStatus.OK).body(saldoAFavorEncontrado);
    }

    @GetMapping("/cuentaYAnio/{idCuentaFinanciera}/{anio}")
    ResponseEntity<SaldoAFavor> buscarPorCuentaYAnio(@PathVariable Long idCuentaFinanciera, @PathVariable Integer anio){
        SaldoAFavor saldoAFavorEncontrado = saldoAFavorService.buscarPorCuentaYAnio(idCuentaFinanciera, anio);
        return ResponseEntity.status(HttpStatus.OK).body(saldoAFavorEncontrado);
    }

    @PutMapping("/{idSaldoAFavor}")
    ResponseEntity<SaldoAFavor> actualizarSaldoAFavor(@PathVariable Long idSaldoAFavor, @RequestBody SaldoAFavor saldoAFavorActualizado){
        SaldoAFavor actualizacionSaldoAFavor = saldoAFavorService.actualizarSaldoAFavor(idSaldoAFavor, saldoAFavorActualizado);
        return ResponseEntity.status(HttpStatus.OK).body(actualizacionSaldoAFavor);
    }

    @DeleteMapping("/{idSaldoAFavor}")
    ResponseEntity<String> eliminarSaldoAFavor(@PathVariable Long idSaldoAFavor){
        saldoAFavorService.eliminarSaldoAFavorPorId(idSaldoAFavor);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Saldo a Favor con Id "+ idSaldoAFavor +" eliminado");
    }
}
