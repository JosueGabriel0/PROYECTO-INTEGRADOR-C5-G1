package upeu.edu.pe.msestudiante.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msestudiante.entity.ResponsableFinanciero;
import upeu.edu.pe.msestudiante.service.ResponsableFinancieroService;

import java.util.List;

@RestController
@RequestMapping("/responsableFinanciero")
public class ResponsableFinancieroController {
    @Autowired
    private ResponsableFinancieroService responsableFinancieroService;

    @PostMapping
    public ResponseEntity<ResponsableFinanciero> guardarResponsableFinanciero(@RequestBody ResponsableFinanciero responsableFinanciero) {
        return ResponseEntity.status(HttpStatus.CREATED).body(responsableFinancieroService.guardarResponsableFinanciero(responsableFinanciero));
    }

    @GetMapping
    public ResponseEntity<List<ResponsableFinanciero>> listarResponsablesFinancieros() {
        return ResponseEntity.status(HttpStatus.OK).body(responsableFinancieroService.listarResponsablesFinancieros());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsableFinanciero> listarResponsablesFinancieroPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(responsableFinancieroService.buscarResponsableFinancieroPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponsableFinanciero> editarResponsableFinanciero(@PathVariable Long id, @RequestBody ResponsableFinanciero responsableFinanciero) {
        responsableFinanciero.setIdResponsableFinanciero(id);
        return ResponseEntity.status(HttpStatus.OK).body(responsableFinancieroService.editarResponsableFinanciero(responsableFinanciero));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarResponsableFinanciero(@PathVariable Long id) {
        responsableFinancieroService.eliminarEstudiante(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/paraEstudiante/{idEstudiante}")
    public ResponseEntity<ResponsableFinanciero> guardarResponsableFinancieroParaEstudiante(@PathVariable Long idEstudiante, @RequestBody ResponsableFinanciero responsableFinanciero) {
        return ResponseEntity.status(HttpStatus.CREATED).body(responsableFinancieroService.guardarResponsableFinancieroParaEstudiante(idEstudiante, responsableFinanciero));
    }
}