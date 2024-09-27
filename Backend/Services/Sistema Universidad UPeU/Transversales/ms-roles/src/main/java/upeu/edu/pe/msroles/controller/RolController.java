package upeu.edu.pe.msroles.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.msroles.entity.Rol;
import upeu.edu.pe.msroles.service.RolService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rol")
public class RolController {
    @Autowired
    private RolService rolService;

    private static final Logger logger = LoggerFactory.getLogger(RolController.class);

    @PostMapping
    public ResponseEntity<Rol> guardarRolResponseEntity(@RequestBody Rol rol){
        logger.info("Solicitud POST recibida para crear rol: {}", rol);
        return ResponseEntity.ok(rolService.guardarRol(rol));
    }

    @GetMapping
    public ResponseEntity<List<Rol>> listarRolResponseEntity(){
        return ResponseEntity.ok(rolService.listarRol());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> buscarRolPorIdResponseEntity(@PathVariable(required = true) Long id){
        return ResponseEntity.ok(rolService.buscarRolPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> editarRolResponseEntity(@PathVariable (required = true) Long id,@RequestBody Rol rol){
        rol.setIdRol(id);
        return ResponseEntity.ok(rolService.editarRol(rol));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) {
        logger.info("Solicitud DELETE recibida para eliminar rol con ID: {}", id);
        try {
            // Lógica para eliminar la Rol
            rolService.eliminarRol(id);

            // Retornar código 200 OK con mensaje de éxito
            return ResponseEntity.ok("Rol eliminada exitosamente.");
        } catch (Exception e) {
            // En caso de error, retornar un código de error y mensaje apropiado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la Rol: " + e.getMessage());
        }
    }
}
