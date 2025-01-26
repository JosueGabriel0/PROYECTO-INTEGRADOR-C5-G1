package upeu.edu.pe.mspersona.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
//import upeu.edu.pe.mspersona.dto.Rol;
import upeu.edu.pe.mspersona.dto.Usuario;
import upeu.edu.pe.mspersona.entity.Persona;
import upeu.edu.pe.mspersona.exception.ResourceNotFoundException;
//import upeu.edu.pe.mspersona.feign.RolFeign;
import upeu.edu.pe.mspersona.feign.UsuarioFeign;
import upeu.edu.pe.mspersona.repository.PersonaRepository;
import upeu.edu.pe.mspersona.service.PersonaService;

import java.util.List;

@Service
public class PersonaSeviceImpl implements PersonaService {
    //INYECCION DE DEPENDENCIAS PRINCIPALES PARA PERSONA
    @Autowired
    private PersonaRepository personaRepository;

    //INYECCION DE DEPENDENCIAS SECUNDARIAS PARA USUARIO CON SU ROL
    @Autowired
    private UsuarioFeign usuarioFeign;

    //METODOS PRINCIPALES DE PERSONA
    @Override
    public Persona guardarPersona(Persona persona) {
        System.out.println("Esta es la persona que se esta guardando en el service Persona: " + persona);
        return personaRepository.save(persona);
    }

    @Override
    public List<Persona> listarPersona(){
        List<Persona> personas = personaRepository.findAll();

        personas.forEach(persona -> {
            try {
                // Intentamos obtener el usuario correspondiente para la persona
                ResponseEntity<Usuario> usuarioResponse = usuarioFeign.listarUsuarioDtoPorId(persona.getIdUsuario());

                if(usuarioResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Usuario con ID " + persona.getIdUsuario() + " no encontrado");
                }

                // Asignamos el usuario a la persona
                persona.setUsuario(usuarioResponse.getBody());

            } catch (FeignException.NotFound e) {
                // Manejo específico si el usuario no es encontrado
                throw new ResourceNotFoundException("Usuario con ID " + persona.getIdUsuario() + " no encontrado");

            } catch (FeignException e) {
                // Otros errores de Feign, por ejemplo, problemas de conexión o timeouts
                throw new RuntimeException("Error al obtener el Usuario con ID " + persona.getIdUsuario(), e);
            }
        });

        return personas;
    }

    @Override
    public Persona buscarPersonaPorId(Long id){
        Persona persona = personaRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("La Persona con ID "+id+" no existe"));
        try {
            ResponseEntity<Usuario> usuarioResponse = usuarioFeign.listarUsuarioDtoPorId(persona.getIdUsuario());
            if(usuarioResponse.getBody() == null){
                throw new ResourceNotFoundException("Usuario con ID "+persona.getIdUsuario()+" no encontrado");
            }
            persona.setUsuario(usuarioResponse.getBody());
        }catch (FeignException e){
            throw new RuntimeException("Error al obtener el Usuario con ID " + persona.getIdUsuario(),e);
        }

        return persona;
        /*
        // Obtener la persona por ID, o lanzar una excepción si no existe
Persona persona = personaRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("La Persona con ID " + id + " no existe"));

try {
    // Obtener el usuario asociado a la persona utilizando Feign
    ResponseEntity<Usuario> usuarioResponse = usuarioFeign.listarUsuarioDtoPorId(persona.getIdUsuario());
    if (usuarioResponse.getBody() == null) {
        throw new ResourceNotFoundException("Usuario con ID " + persona.getIdUsuario() + " no encontrado");
    }

    Usuario usuario = usuarioResponse.getBody();

    // Obtener el rol asociado al usuario utilizando Feign
    try {
        ResponseEntity<Rol> rolResponse = rolFeign.listarRolDtoPorId(usuario.getIdRol());
        if (rolResponse.getBody() == null) {
            throw new ResourceNotFoundException("Rol con ID " + usuario.getIdRol() + " no encontrado");
        }
        // Asignar el rol al usuario
        usuario.setRol(rolResponse.getBody());

    } catch (FeignException e) {
        // Manejo de error al obtener el rol a través de Feign
        throw new RuntimeException("Error al obtener el Rol con ID " + usuario.getIdRol(), e);
    }

    // Asignar el usuario a la persona
    persona.setUsuario(usuario);

} catch (FeignException e) {
    // Manejo de error al obtener el usuario a través de Feign
    throw new RuntimeException("Error al obtener el Usuario con ID " + persona.getIdUsuario(), e);
}

// Retornar la persona con el usuario y rol asignados
return persona;
         */
    }

    @Override
    public Persona editarPersona(Persona persona) {
        return personaRepository.save(persona);
    }

    @Override
    public void eliminarPersona(Long id){
        personaRepository.deleteById(id);
    }

    @Override
    public Persona actualizarDatosEspecificos(Long idPersona, Persona personaActualizada){
        Persona personaEncontrada = personaRepository.findById(idPersona).orElseThrow(() -> new IllegalArgumentException("Persona con ID" + idPersona + " no existe"));
        personaEncontrada.setNombres(personaActualizada.getNombres());
        personaEncontrada.setApellido_paterno(personaActualizada.getApellido_paterno());
        personaEncontrada.setApellido_materno(personaActualizada.getApellido_materno());
        personaEncontrada.setTipoDocumento(personaActualizada.getTipoDocumento());
        personaEncontrada.setTelefono(personaActualizada.getTelefono());
        personaEncontrada.setEmail(personaActualizada.getEmail());

        return personaRepository.save(personaEncontrada);
    }
}
