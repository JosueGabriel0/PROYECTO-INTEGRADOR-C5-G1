package upeu.edu.pe.msauth.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import upeu.edu.pe.msauth.dto.Inscripcion;
import upeu.edu.pe.msauth.dto.Persona;
import upeu.edu.pe.msauth.dto.Usuario;

import java.util.ArrayList;
import java.util.List;

@FeignClient(name = "ms-inscripciones-service", path = "/inscripcion")
public interface InscripcionFeign {

    //CRUD DE INSCRIPCION
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CircuitBreaker(name = "crearInscripcionCB", fallbackMethod = "fallBackCrearInscripcion")
    public ResponseEntity<Inscripcion> crearInscripcion(
            @RequestPart("inscripcion") String inscripcionJson, // Recibe el JSON como String
            @RequestPart("file") MultipartFile fotoPerfil);

    @PostMapping(value = "/crear-persona", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CircuitBreaker(name = "crearPersonaCB", fallbackMethod = "fallBackCrearPersona")
    public ResponseEntity<String> crearPersona(
            @ModelAttribute Persona personaDTO,
            @RequestParam("file") MultipartFile fotoPerfil);

    @PutMapping(value = "/{idInscripcion}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CircuitBreaker(name = "actualizarInscripcionCB", fallbackMethod = "fallBackActualizarInscripcion")
    public ResponseEntity<Inscripcion> actualizarInscripcion(
            @PathVariable Long idInscripcion,
            @RequestPart("inscripcion") String inscripcionJson,
            @RequestPart("file") MultipartFile fotoPerfil);

    @DeleteMapping("/{id}")
    @CircuitBreaker(name = "eliminarDatosInscripcionCB", fallbackMethod = "fallBackEliminarDatosInscripcion")
    public ResponseEntity<String> eliminarDatosInscripcion(@PathVariable Long id);

    @GetMapping
    @CircuitBreaker(name = "listarInscripcionesCB", fallbackMethod = "fallBackListarInscripciones")
    public ResponseEntity<List<Inscripcion>> listarInscripciones();

    @GetMapping("/{id}")
    @CircuitBreaker(name = "listarInscripcionPorIdCB", fallbackMethod = "fallBackListarInscripcionesPorIdCB")
    public ResponseEntity<Inscripcion> listarInscripcionPorId(@PathVariable(required = true) Long id);

    @GetMapping("/usuario/{idUsuario}")
    @CircuitBreaker(name = "buscarInscripcionPorIdUsuarioCB", fallbackMethod = "fallBackBuscarInscripcionPorIdUsuario")
    public ResponseEntity<Inscripcion> buscarInscripcionPorIdUsuario(@PathVariable(required = true) Long idUsuario);

    //Metodos default fallback
    default ResponseEntity<Inscripcion> fallBackCrearInscripcion(
            String inscripcionJson, // Recibe el JSON como String
            MultipartFile fotoPerfil,
            Exception e){
        return ResponseEntity.ok(new Inscripcion());
    }

    default ResponseEntity<String> fallBackCrearPersona(
            Persona personaDTO,
            MultipartFile fotoPerfil,
            Exception e){
        String response = "Sin datos, fallbackMethod Activado";
        return ResponseEntity.ok(response);
    }

    default ResponseEntity<Inscripcion> fallBackActualizarInscripcion(
            Long idInscripcion,
            String inscripcionJson,
            MultipartFile fotoPerfil,
            Exception e){
        return ResponseEntity.ok(new Inscripcion());
    }

    default ResponseEntity<String> fallBackEliminarDatosInscripcion(Long id, Exception e){
        return ResponseEntity.ok("No se pudo eliminar, fallbackMethod Activado");
    }

    default ResponseEntity<List<Inscripcion>> fallBackListarInscripciones(Exception e){
        return ResponseEntity.ok(new ArrayList<>());
    }

    default ResponseEntity<Inscripcion> fallBackListarInscripcionesPorIdCB(Long id, Exception e){
        return ResponseEntity.ok(new Inscripcion());
    }

    default ResponseEntity<Inscripcion> fallBackBuscarInscripcionPorIdUsuario(Long idUsuario, Exception e){
        return ResponseEntity.ok(new Inscripcion());
    }
}
