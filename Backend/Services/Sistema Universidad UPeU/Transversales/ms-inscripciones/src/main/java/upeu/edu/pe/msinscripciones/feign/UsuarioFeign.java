package upeu.edu.pe.msinscripciones.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msinscripciones.dto.Usuario;

import java.util.ArrayList;
import java.util.List;

@FeignClient(name = "ms-usuarios-service", path = "/usuario")
public interface UsuarioFeign {

    @PostMapping
    @CircuitBreaker(name = "crearUsuarioCB", fallbackMethod = "fallbackMethodCrearUsuario")
    ResponseEntity<?> crearUsuarioDto(@RequestBody Usuario usuario);

    @GetMapping
    @CircuitBreaker(name = "listarUsuariosCB", fallbackMethod = "fallbackMethodListarUsuarios")
    ResponseEntity<List<Usuario>> listarUsuariosDto();

    @GetMapping("/{id}")
    @CircuitBreaker(name = "listrUsuarioPorIdCB", fallbackMethod = "fallbackMethodListarUsuarioPorId")
    ResponseEntity<Usuario> listarUsuarioDtoPorId(@PathVariable Long id);

    @PutMapping("/{id}")  // Añadir la ruta con el ID
    @CircuitBreaker(name = "actualizarUsuarioCB", fallbackMethod = "fallbackMethodActualizarUsuario")
    ResponseEntity<Usuario> actualizarUsuarioDto(@PathVariable Long id, @RequestBody Usuario usuario);

    @DeleteMapping("/{id}")  // Añadir la ruta con el ID
    @CircuitBreaker(name = "eliminarUsuarioCB", fallbackMethod = "fallbackMethodEliminarUsuario")
    ResponseEntity<String> eliminarUsuarioDto(@PathVariable Long id);

    default ResponseEntity<?> fallbackMethodCrearUsuario(Usuario Usuario, Exception e){
        return ResponseEntity.ok(new Usuario());
    }

    default ResponseEntity<List<Usuario>> fallbackMethodListarUsuarios(Exception e){
        return ResponseEntity.ok(new ArrayList<Usuario>());
    }

    default ResponseEntity<Usuario> fallbackMethodListarUsuarioPorId(Long id, Exception e){
        return ResponseEntity.ok(new Usuario());
    }

    default ResponseEntity<Usuario> fallbackMethodActualizarUsuario(Long id, Usuario Usuario, Exception e){
        return ResponseEntity.ok(new Usuario());
    }

    default ResponseEntity<String> fallbackMethodEliminarUsuario(Long id, Exception e){
        return ResponseEntity.ok("Error al eliminar el Usuario. Fallback activado");
    }
}