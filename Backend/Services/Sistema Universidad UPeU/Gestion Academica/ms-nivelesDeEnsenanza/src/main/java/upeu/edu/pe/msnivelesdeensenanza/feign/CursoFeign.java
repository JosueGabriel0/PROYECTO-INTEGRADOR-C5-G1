package upeu.edu.pe.msnivelesdeensenanza.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import upeu.edu.pe.msnivelesdeensenanza.dto.Curso;

@FeignClient(name = "ms-curso-service", path = "/curso")
public interface CursoFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "listarCursoPorIdCB", fallbackMethod = "fallbackListarCursoPorId")
    public ResponseEntity<Curso> listarCursoPorId(@PathVariable Long id);

    default ResponseEntity<Curso> fallbackListarCursoPorId(Long id, Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Curso());
    }
}