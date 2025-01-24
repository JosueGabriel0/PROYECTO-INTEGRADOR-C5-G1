package upeu.edu.pe.msdocente.controller;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msdocente.dto.ErrorResponseDto;
import upeu.edu.pe.msdocente.dto.Persona;
import upeu.edu.pe.msdocente.entity.Docente;
import upeu.edu.pe.msdocente.feign.PersonaFeign;
import upeu.edu.pe.msdocente.service.DocenteService;

import java.util.List;

@RestController
@RequestMapping("/docente")

public class DocenteController {
    @Autowired
    private DocenteService docenteService;
    @Autowired
    private PersonaFeign personaFeign;

    @PostMapping
    public ResponseEntity<?> guardarDocenteResponseEntity(@RequestBody Docente docente){
        try {
            // Verificar si el curso existe
            Persona personaDto = personaFeign.listarPersonaDtoPorId(docente.getIdPersona()).getBody();
            if (personaDto == null || personaDto.getId() == null) {
                String ErrorMessage = "Error: Persona no encontrada";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(ErrorMessage));
            }

            // Asignar el curso al docente
            docente.setPersona(personaDto);

            // Guardar el pedido si todas las validaciones pasaron
            Docente docenteGuardado = docenteService.guardarDocente(docente);

            // Retornar respuesta exitosa
            return ResponseEntity.status(HttpStatus.CREATED).body(docenteGuardado);

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
    public ResponseEntity<List<Docente>> listarDocentesResponseEntity(){
        return ResponseEntity.ok(docenteService.listarDocente());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Docente> buscarDocentePorIdResponseEntity(@PathVariable( required = true) Long id){
        return ResponseEntity.ok(docenteService.buscarDocentePorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Docente> editarDocenteResponseEntity(@PathVariable( required = true) Long id, @RequestBody Docente docente){
        docente.setIdDocente(id);
        return ResponseEntity.ok(docenteService.editarDocente(docente));
    }

    @DeleteMapping("/{id}")
    public String eliminarDocenteResponseEntity(@PathVariable( required = true) Long id){
        docenteService.eliminarDocente(id);
        return "Docente eliminado";
    }
}
