package upeu.edu.pe.msinscripciones.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msinscripciones.dto.Estudiante;

import java.util.ArrayList;
import java.util.List;

@FeignClient(name = "ms-estudiante-service", path = "/estudiante")
public interface EstudianteFeign {

    @PostMapping
    @CircuitBreaker(name = "crearEstudianteCB", fallbackMethod = "fallbackMethodCrearEstudiante")
    ResponseEntity<?> crearEstudianteDto(@RequestBody Estudiante estudiante);

    @GetMapping
    @CircuitBreaker(name = "listarEstudiantesCB", fallbackMethod = "fallbackMethodListarEstudiantes")
    ResponseEntity<List<Estudiante>> listarEstudiantesDto();

    @GetMapping("/{id}")
    @CircuitBreaker(name = "listarEstudiantePorIdCB", fallbackMethod = "fallbackMethodListarEstudiantePorId")
    ResponseEntity<Estudiante> listarEstudianteDtoPorId(@PathVariable Long id);

    @PutMapping("/{id}")  // Añadir la ruta con el ID
    @CircuitBreaker(name = "actualizarEstudianteCB", fallbackMethod = "fallbackMethodActualizarEstudiante")
    ResponseEntity<Estudiante> actualizarEstudianteDto(@PathVariable Long id, @RequestBody Estudiante estudiante);

    @DeleteMapping("/{id}")  // Añadir la ruta con el ID
    @CircuitBreaker(name = "eliminarEstudianteCB", fallbackMethod = "fallbackMethodEliminarEstudiante")
    ResponseEntity<String> eliminarEstudianteDto(@PathVariable Long id);

    default ResponseEntity<?> fallbackMethodCrearEstudiante(Estudiante estudiante, Exception e){
        return ResponseEntity.ok(new Estudiante());
    }

    default ResponseEntity<List<Estudiante>> fallbackMethodListarEstudiantes(Exception e){
        return ResponseEntity.ok(new ArrayList<Estudiante>());
    }

    default ResponseEntity<Estudiante> fallbackMethodListarEstudiantePorId(Long id, Exception e){
        return ResponseEntity.ok(new Estudiante());
    }

    default ResponseEntity<Estudiante> fallbackMethodActualizarEstudiante(Long id, Estudiante estudiante, Exception e){
        return ResponseEntity.ok(new Estudiante());
    }

    default ResponseEntity<String> fallbackMethodEliminarEstudiante(Long id, Exception e){
        return ResponseEntity.ok("Error al eliminar el docente. Fallback activado");
    }
}
