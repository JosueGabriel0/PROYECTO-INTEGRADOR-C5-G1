package upeu.edu.pe.msnivelesdeensenanza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msnivelesdeensenanza.entity.NivelEnsenanza;
import upeu.edu.pe.msnivelesdeensenanza.service.NivelEnsenanzaService;

import java.util.List;

@RestController
@RequestMapping("/nivelEnsenanza")
public class NivelEnsenanzaController {

    @Autowired
    private NivelEnsenanzaService nivelEnsenanzaService;

    @GetMapping
    public ResponseEntity<List<NivelEnsenanza>> listarNiveles() {
        return ResponseEntity.ok(nivelEnsenanzaService.obtenerNiveles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NivelEnsenanza> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(nivelEnsenanzaService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<NivelEnsenanza> crear(@RequestBody NivelEnsenanza nivelEnsenanza) {
        return ResponseEntity.ok(nivelEnsenanzaService.crear(nivelEnsenanza));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NivelEnsenanza> actualizar(@PathVariable Long id, @RequestBody NivelEnsenanza nivelEnsenanza) {
        return ResponseEntity.ok(nivelEnsenanzaService.actualizar(id, nivelEnsenanza));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable(required = true) Long id) {
        nivelEnsenanzaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-opcion/{idOpcionNivel}")
    public ResponseEntity<NivelEnsenanza> obtenerNivelEnsenanzaPorIdOpcionNivel(@PathVariable Long idOpcionNivel) {
        return ResponseEntity.status(HttpStatus.OK).body(nivelEnsenanzaService.obtenerNivelEnsenanzaPorIdOpcionNivel(idOpcionNivel));
    }
}
