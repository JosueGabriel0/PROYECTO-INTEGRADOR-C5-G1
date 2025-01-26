package upeu.edu.pe.msestudiante.controller;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msestudiante.dto.ErrorResponseDto;
import upeu.edu.pe.msestudiante.dto.Persona;
import upeu.edu.pe.msestudiante.entity.Estudiante;
import upeu.edu.pe.msestudiante.feign.PersonaFeign;
import upeu.edu.pe.msestudiante.service.EstudianteService;

import java.util.List;

@RestController
@RequestMapping("/estudiante")

public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;
    @Autowired
    private PersonaFeign personaFeign;

    @PostMapping
    public ResponseEntity<?> guardarEstudianteResponseEntity(@RequestBody Estudiante estudiante){
        try {
            // Verificar si la persona existe
            Persona personaDto = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona()).getBody();
            if (personaDto == null || personaDto.getId() == null) {
                String ErrorMessage = "Error: Persona no encontrada";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(ErrorMessage));
            }


            // Asignar la persona al Estudiante
            estudiante.setPersona(personaDto);

            Estudiante EstudianteGuardado = estudianteService.guardarEstudiante(estudiante);

            // Retornar respuesta exitosa
            return ResponseEntity.status(HttpStatus.CREATED).body(EstudianteGuardado);

        } catch (FeignException e) {
            // Imprimir los detalles del error que Feign está arrojando
            String errorMensaje = "Error al comunicarse con otro servicio: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMensaje);

        } catch (Exception e) {
            // Manejo de cualquier otro error inesperado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Estudiante>> listarEstudiantesResponseEntity() {
        return ResponseEntity.ok(estudianteService.listarEstudiante());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> buscarEstudiantePorIdResponseEntity(@PathVariable( required = true) Long id){
        return ResponseEntity.ok(estudianteService.buscarEstudiantePorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> editarEstudianteResponseEntity(@PathVariable( required = true) Long id, @RequestBody Estudiante estudiante){
        estudiante.setIdEstudiante(id);
        return ResponseEntity.ok(estudianteService.editarEstudiante(estudiante));
    }

    @DeleteMapping("/{id}")
    public String eliminarEstudianteResponseEntity(@PathVariable( required = true) Long id){
        estudianteService.eliminarEstudiante(id);
        return "Estudiante eliminado";
    }

    @GetMapping("/cuentaFinanciera/{idCuentaFinanciera}")
    public ResponseEntity<Estudiante> buscarEstudiantePorCuentaFinanciera(@PathVariable( required = true) Long idCuentaFinanciera){
        return ResponseEntity.ok(estudianteService.buscarPorCuentaFinanciera(idCuentaFinanciera));
    }

    @PutMapping("/codigoEstudiante/{codigo}/{idEstudiante}")
    public ResponseEntity<Estudiante> actualizarCodigoEstudiante(@PathVariable Long idEstudiante, @PathVariable String codigo){
        return ResponseEntity.status(HttpStatus.OK).body(estudianteService.actualizarCodigo(idEstudiante, codigo));
    }
}
