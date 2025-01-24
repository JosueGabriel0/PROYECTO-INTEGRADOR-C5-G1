package upeu.edu.pe.msnivelesdeensenanza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msnivelesdeensenanza.dto.Estudiante;
import upeu.edu.pe.msnivelesdeensenanza.entity.OpcionNivel;
import upeu.edu.pe.msnivelesdeensenanza.feign.EstudianteFeign;
import upeu.edu.pe.msnivelesdeensenanza.service.OpcionNivelService;

import java.util.List;

@RestController
@RequestMapping("/opcionNivel")
public class OpcionNivelController {

    @Autowired
    private OpcionNivelService opcionNivelService;

    @Autowired
    private EstudianteFeign estudianteFeign;

    @GetMapping("/nivelEnsenanza/{nivelId}")
    public ResponseEntity<List<OpcionNivel>> listarOpcionesNivelPorNivel(@PathVariable Long nivelId) {
        return ResponseEntity.ok(opcionNivelService.obtenerOpcionesPorNivel(nivelId));
    }

    @GetMapping
    public ResponseEntity<List<OpcionNivel>> listarTodos() {
        return ResponseEntity.ok(opcionNivelService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpcionNivel> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(opcionNivelService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<OpcionNivel> crear(@RequestBody OpcionNivel opcionNivel) {
        return ResponseEntity.ok(opcionNivelService.crear(opcionNivel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OpcionNivel> actualizar(@PathVariable Long id, @RequestBody OpcionNivel opcionNivel) {
        opcionNivel.setIdOpcionNivel(id);
        return ResponseEntity.ok(opcionNivelService.actualizar(opcionNivel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        opcionNivelService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-estudiante/{idEstudiante}")
    public List<OpcionNivel> obtenerOpcionesPorEstudiante(@PathVariable Long idEstudiante) {
        // Supongamos que tienes un servicio de Estudiante para obtenerlo por ID
        Estudiante estudiante = estudianteFeign.listarEstudianteDtoPorId(idEstudiante).getBody();
        return opcionNivelService.listarOpcionesPorCarreras(estudiante.getCarrerasIngresadasIds());
    }
}
