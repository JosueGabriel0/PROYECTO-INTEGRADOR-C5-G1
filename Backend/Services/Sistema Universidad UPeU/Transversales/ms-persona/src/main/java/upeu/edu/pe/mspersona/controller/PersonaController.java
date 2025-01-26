package upeu.edu.pe.mspersona.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import upeu.edu.pe.mspersona.dto.ErrorResponseDto;
import upeu.edu.pe.mspersona.dto.Usuario;
import upeu.edu.pe.mspersona.entity.Persona;
import upeu.edu.pe.mspersona.exception.ResourceNotFoundException;
import upeu.edu.pe.mspersona.feign.UsuarioFeign;
import upeu.edu.pe.mspersona.service.PersonaService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/persona")
public class PersonaController {
    @Autowired
    private PersonaService personaService;
    @Autowired
    private UsuarioFeign usuarioFeign;

    // Ruta para obtener la imagen por su nombre
    @GetMapping("/images/{nombreImagen}")
    public ResponseEntity<FileSystemResource> getImagen(@PathVariable String nombreImagen) {
        String directorioImagenes = "src/main/resources/static/images"; // Cambia esto a la ruta correcta
        File imagen = new File(directorioImagenes, nombreImagen);

        if (imagen.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imagen.getName() + "\"")
                    .body(new FileSystemResource(imagen));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> guardarPersonaResponseEntity(@ModelAttribute Persona persona, @RequestParam("file") MultipartFile fotoPerfil){
        if(!fotoPerfil.isEmpty()){
            Path directorioImagenes = Paths.get("src//main//resources//static/images");
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
            try {
                byte[] bytesImg = fotoPerfil.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + fotoPerfil.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

                persona.setFotoPerfil(fotoPerfil.getOriginalFilename());
            }catch (IOException e){
                e.printStackTrace();
            }

        }

        Usuario usuarioDto = usuarioFeign.listarUsuarioDtoPorId(persona.getIdUsuario()).getBody();

        if(usuarioDto == null || usuarioDto.getIdUsuario() == null){
            String ErrorMessage = "Error: Usuario no encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(ErrorMessage));
        }

        System.out.println("Este es la persona que se esta guardado en el controller Persona: " + persona);
        Persona nuevaPersona =personaService.guardarPersona(persona);
        System.out.println("Este es la nuevaPersona que se esta guardado en el controller Persona: " + persona);
        return ResponseEntity.ok(nuevaPersona);
    }

    @GetMapping
    public ResponseEntity<List<Persona>> listarPersonaResponseEntity(){
        try {
            List<Persona> personas = personaService.listarPersona();
            return ResponseEntity.ok(personas);
        } catch (Exception e) {
            // Capturamos cualquier error inesperado y devolvemos una respuesta de error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    /**
     * Manejo de la excepción ResourceNotFoundException.
     * Devuelve un 404 si no se encuentra el recurso solicitado.
     *
     * @param ex Excepción capturada.
     * @return Mensaje de error con un código de estado 404.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> buscarPersonaPorIdResponseEntity(@PathVariable(required = true) Long id){
        return ResponseEntity.ok(personaService.buscarPersonaPorId(id));
    }


    @PutMapping(value="/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editarPersonaResponseEntity(@PathVariable(required = true) Long id,@ModelAttribute Persona persona, @RequestParam("file") MultipartFile fotoPerfil){
        persona.setId(id);
        if(!fotoPerfil.isEmpty()){
            Path directorioImagenes = Paths.get("src//main//resources//static/images");
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
            try {
                byte[] bytesImg = fotoPerfil.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + fotoPerfil.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

                persona.setFotoPerfil(fotoPerfil.getOriginalFilename());
            }catch (IOException e){
                e.printStackTrace();
            }

        }

        Usuario usuarioDto = usuarioFeign.listarUsuarioDtoPorId(persona.getIdUsuario()).getBody();

        if(usuarioDto == null || usuarioDto.getIdUsuario() == null){
            String ErrorMessage = "Error: Usuario no encontrado";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseDto(ErrorMessage));
        }

        System.out.println("Este es la persona que se esta guardado en el controller Persona: " + persona);
        Persona personaEditada =personaService.editarPersona(persona);
        System.out.println("Este es la nuevaPersona que se esta guardado en el controller Persona: " + persona);
        return ResponseEntity.ok(personaEditada);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarPersona(@PathVariable Long id) {
        try {
            // Lógica para eliminar la persona
            personaService.eliminarPersona(id);

            // Retornar código 200 OK con mensaje de éxito
            return ResponseEntity.ok("Persona eliminada exitosamente.");
        } catch (Exception e) {
            // En caso de error, retornar un código de error y mensaje apropiado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la persona: " + e.getMessage());
        }
    }

    @PutMapping("/actualizarDatosPersona/{idPersona}")
    public ResponseEntity<Persona> actualizarDatosEspecificos(@PathVariable Long idPersona, @RequestBody Persona personaActualizada) {
        return ResponseEntity.status(HttpStatus.OK).body(personaService.actualizarDatosEspecificos(idPersona, personaActualizada));
    }
}