package upeu.edu.pe.msadministrativo.controller;

import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msadministrativo.dto.ErrorResponseDto;
import upeu.edu.pe.msadministrativo.dto.Persona;
import upeu.edu.pe.msadministrativo.entity.Administrativo;
import upeu.edu.pe.msadministrativo.feign.PersonaFeign;
import upeu.edu.pe.msadministrativo.service.AdministrativoService;

import java.util.List;

@RestController
@RequestMapping("/administrativo")

public class AdministrativoController {
    @Autowired
    private AdministrativoService administrativoService;
    
    @Autowired
    private PersonaFeign personaFeign;

    @PostMapping
    public ResponseEntity<?> guardarAdministrativoResponseEntity(@RequestBody Administrativo administrativo){
        try {
            // Verificar si la persona existe
            Persona personaDto = personaFeign.listarPersonaDtoPorId(administrativo.getIdPersona()).getBody();
            if (personaDto == null || personaDto.getId() == null) {
                String ErrorMessage = "Error: Persona no encontrada";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(ErrorMessage));
            }

            administrativo.setPersona(personaDto);

            // Guardar el pedido si todas las validaciones pasaron
            Administrativo AdministrativoGuardado = administrativoService.guardarAdministrativo(administrativo);

            // Retornar respuesta exitosa
            return ResponseEntity.status(HttpStatus.CREATED).body(AdministrativoGuardado);

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
    public ResponseEntity<List<Administrativo>> listarAdministrativosResponseEntity(){
        return ResponseEntity.ok(administrativoService.listarAdministrativo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrativo> buscarAdministrativoPorIdResponseEntity(@PathVariable( required = true) Long id){
        return ResponseEntity.ok(administrativoService.buscarAdministrativoPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrativo> editarAdministrativoResponseEntity(@PathVariable( required = true) Long id, @RequestBody Administrativo administrativo){
        administrativo.setIdAdministrativo(id);
        return ResponseEntity.ok(administrativoService.editarAdministrativo(administrativo));
    }

    @DeleteMapping("/{id}")
    public String eliminarAdministrativoResponseEntity(@PathVariable( required = true) Long id){
        administrativoService.eliminarAdministrativo(id);
        return "Administrativo eliminado";
    }
}
