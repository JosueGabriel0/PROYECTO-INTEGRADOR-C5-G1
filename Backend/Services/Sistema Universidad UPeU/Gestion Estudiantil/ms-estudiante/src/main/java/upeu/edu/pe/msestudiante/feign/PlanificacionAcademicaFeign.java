package upeu.edu.pe.msestudiante.feign;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import upeu.edu.pe.msestudiante.dto.PlanificacionAcademica;

@FeignClient(name = "ms-planificacionAcademica-service", path = "/planificacionAcademica")
public interface PlanificacionAcademicaFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "buscarPlanificacionAcademicaPorIdCB", fallbackMethod = "fallbackBuscarPlanificacionAcademicaPorId")
    public ResponseEntity<PlanificacionAcademica> buscarPlanificacionAcademicaPorId(@PathVariable Long id);

    default ResponseEntity<PlanificacionAcademica> fallbackBuscarPlanificacionAcademicaPorId(Long id, Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new PlanificacionAcademica());
    }
}
