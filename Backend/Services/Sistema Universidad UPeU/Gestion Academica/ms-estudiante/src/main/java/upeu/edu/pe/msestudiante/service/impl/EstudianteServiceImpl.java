package upeu.edu.pe.msestudiante.service.impl;

import feign.FeignException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msestudiante.dto.Curso;
import upeu.edu.pe.msestudiante.dto.EstudianteRequest;
import upeu.edu.pe.msestudiante.dto.Persona;
import upeu.edu.pe.msestudiante.entity.Estudiante;
import upeu.edu.pe.msestudiante.exception.ResourceNotFoundException;
import upeu.edu.pe.msestudiante.feign.CursoFeign;
import upeu.edu.pe.msestudiante.feign.PersonaFeign;
import upeu.edu.pe.msestudiante.repository.EstudianteRepository;
import upeu.edu.pe.msestudiante.service.EstudianteService;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PersonaFeign personaFeign;

    @Autowired
    private CursoFeign cursoFeign;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public Estudiante crearEstudianteConPersona(EstudianteRequest estudianteRequest) {
        // 1. Crear Persona en el microservicio Persona usando Feign
        Persona personaCreada = personaFeign.crearPersonaDto(estudianteRequest.getPersona());

        // 2. Mapear directamente desde el DTO al objeto Estudiante
        Estudiante estudiante = modelMapper.map(estudianteRequest, Estudiante.class);

        // 3. Establecer el idPersona del estudiante (ya que esto viene de la respuesta de Persona)
        estudiante.setIdPersona(personaCreada.getId());
        estudiante.setPersona(personaCreada);

        // 4. Guardar el estudiante en la base de datos local
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante guardarEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public List<Estudiante> listarEstudiantesConPersona() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();

        estudiantes.forEach(estudiante -> {
            try {
            ResponseEntity<Persona> personaResponse = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona());
            if(personaResponse.getBody() == null){
                throw new ResourceNotFoundException("La Persona con ID "+estudiante.getIdPersona()+" no existe");
            }
            estudiante.setPersona(personaResponse.getBody());
            }catch (FeignException e){
                throw new RuntimeException("Error al obtener la Persona con ID "+estudiante.getIdPersona(),e);
            }
        });

        return estudiantes;
    }

    @Override
    public List<Estudiante> listarEstudiantes() {
        List<Estudiante> estudiantes = estudianteRepository.findAll();

        estudiantes.forEach(estudiante -> {
            try {
                ResponseEntity<Persona> personaResponse = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona());
                if(personaResponse.getBody() == null){
                    throw new ResourceNotFoundException("Persona con ID "+estudiante.getIdPersona()+" no encontrado");
                }
                estudiante.setPersona(personaResponse.getBody());
            }catch (FeignException e){
                throw new RuntimeException("Error al obtener la Persona con ID "+estudiante.getIdPersona(),e);
            }
        });
        return estudiantes;
    }

    @Override
    public Estudiante listarEstudianteConPersonaPorId(Long id) {
        Estudiante estudiante = estudianteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Estudiante con ID: "+id+" no existe"));

        try {
            ResponseEntity<Persona> personaResponse = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona());
            if(personaResponse.getBody() == null){
                throw new ResourceNotFoundException("Persona con ID "+estudiante.getIdPersona()+" no encontrado");
            }
            estudiante.setPersona(personaResponse.getBody());
        }catch(ResourceNotFoundException e){
            throw new RuntimeException("Error al obtener la Persona con ID "+estudiante.getIdPersona(),e);
        }

        return estudiante;
    }

    @Override
    public Estudiante listarEstudiantePorId(Long id) {
        // 1. Buscar el estudiante en la base de datos por su ID
        Optional<Estudiante> estudianteOptional = estudianteRepository.findById(id);

        // 2. Verificar si el estudiante existe y devolverlo
        return estudianteOptional.orElseThrow(() ->
                new EntityNotFoundException("Estudiante con ID " + id + " no encontrado")
        );
    }

    @Override
    @Transactional
    public Estudiante editarEstudianteConPersona(Long id, EstudianteRequest estudianteRequest) {
        // 1. Buscar el estudiante por su ID
        Estudiante estudianteExistente = estudianteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante con ID " + id + " no encontrado"));

        // 2. Actualizar la Persona asociada en el microservicio de Persona
        ResponseEntity<Persona> responseEntity = personaFeign.actualizarPersonaDto(estudianteExistente.getIdPersona(), estudianteRequest.getPersona());

        // 3. Verificar si la respuesta es exitosa (status code 200)
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            // Obtener el cuerpo de la respuesta que contiene el objeto Persona actualizado
            Persona personaActualizada = responseEntity.getBody();

            // 4. Mapear los datos actualizados de estudiante
            estudianteExistente.setMatricula(estudianteRequest.getMatricula());
            estudianteExistente.setCicloActual(estudianteRequest.getCicloActual());
            estudianteExistente.setPromedioGeneral(estudianteRequest.getPromedioGeneral());
            // Otros campos del estudiante a actualizar...

            // 5. Actualizar la persona en el estudiante
            estudianteExistente.setPersona(personaActualizada);

            // 6. Guardar los cambios en el repositorio
            return estudianteRepository.save(estudianteExistente);
        } else {
            throw new RuntimeException("Error al actualizar la persona. Código de estado: " + responseEntity.getStatusCode());
        }
    }

    @Override
    @Transactional
    public Estudiante editarSoloEstudiante(Long id, Estudiante estudianteRequest) {
        // 1. Buscar el estudiante por su ID
        Estudiante estudianteExistente = estudianteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante con ID " + id + " no encontrado"));

        // 2. Actualizar los datos del estudiante
        estudianteExistente.setMatricula(estudianteRequest.getMatricula());
        estudianteExistente.setCicloActual(estudianteRequest.getCicloActual());
        estudianteExistente.setPromedioGeneral(estudianteRequest.getPromedioGeneral());
        // Otros campos del estudiante a actualizar...

        // 3. Guardar los cambios en el repositorio
        return estudianteRepository.save(estudianteExistente);
    }

    @Override
    @Transactional
    public void eliminarEstudianteConPersona(Long id) {
        // 1. Buscar el estudiante por su ID
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante con ID " + id + " no encontrado"));

        // 2. Obtener el ID de la persona asociada
        Long idPersona = estudiante.getIdPersona();

        // 3. Eliminar el estudiante de la base de datos
        estudianteRepository.deleteById(id);

        // 4. Eliminar la persona asociada utilizando Feign
        try {
            ResponseEntity<String> response = personaFeign.eliminarPersonaDto(idPersona);
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Error al eliminar la persona asociada: " + response.getBody());
            }
        } catch (FeignException e) {
            // Manejar errores de Feign (opcional: podrías registrar el error o tomar otra acción)
            throw new RuntimeException("Error al eliminar la persona asociada: " + e.getMessage(), e);
        }
    }

    @Override
    public void eliminarEstudiante(Long id) {
        estudianteRepository.deleteById(id);
    }
}