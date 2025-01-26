package upeu.edu.pe.msestudiante.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msestudiante.dto.CuentaFinanciera;
import upeu.edu.pe.msestudiante.dto.Persona;
import upeu.edu.pe.msestudiante.dto.PlanificacionAcademica;
import upeu.edu.pe.msestudiante.entity.Estudiante;
import upeu.edu.pe.msestudiante.entity.RegistroAcademico;
import upeu.edu.pe.msestudiante.exception.ResourceNotFoundException;
import upeu.edu.pe.msestudiante.feign.CuentaFinancieraFeign;
import upeu.edu.pe.msestudiante.feign.PersonaFeign;
import upeu.edu.pe.msestudiante.feign.PlanificacionAcademicaFeign;
import upeu.edu.pe.msestudiante.repository.EstudianteRepository;
import upeu.edu.pe.msestudiante.service.EstudianteService;

import java.time.LocalDate;
import java.util.List;

@Service

public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    EstudianteRepository estudianteRepository;

    @Autowired
    private PersonaFeign personaFeign;

    @Autowired
    private CuentaFinancieraFeign cuentaFinancieraFeign;

    @Autowired
    private PlanificacionAcademicaFeign planificacionAcademicaFeign;

    @Override
    public Estudiante guardarEstudiante(Estudiante estudiante) {
        // Asigna el estudiante a cada registro académico en el historial
        if (estudiante.getHistorialAcademico() != null) {
            for (RegistroAcademico registro : estudiante.getHistorialAcademico()) {
                registro.setEstudiante(estudiante);
            }
        }

        CuentaFinanciera nuevaCuentaFinanciera = new CuentaFinanciera();
        nuevaCuentaFinanciera.setEntidad("UPeU");
        nuevaCuentaFinanciera.setDepartamento("FILIAL JULIACA");
        nuevaCuentaFinanciera.setAnio(LocalDate.parse("2025-01-01"));
        ResponseEntity<CuentaFinanciera> cuentaFinancieraCreada = cuentaFinancieraFeign.crearCuentaFinancieraDto(nuevaCuentaFinanciera);

        System.out.println(cuentaFinancieraCreada.getBody().getIdCuentaFinanciera());
        Long idCuentaFinancieraCreada = cuentaFinancieraCreada.getBody().getIdCuentaFinanciera();

        estudiante.setIdCuentaFinanciera(idCuentaFinancieraCreada);

        // Guarda el estudiante con el historial académico ya enlazado
        return estudianteRepository.save(estudiante);
    }


    @Override
    public List<Estudiante> listarEstudiante() {
        List<Estudiante> estudiantes = estudianteRepository.findAllWithHistorial();

        estudiantes.forEach(estudiante -> {
            try {
                ResponseEntity<Persona> personaResponse = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona());
                if (personaResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Persona con ID " + estudiante.getIdPersona() + " no existe");
                }
                estudiante.setPersona(personaResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener la persona con ID " + estudiante.getIdPersona(), e);
            }

            try {
                ResponseEntity<CuentaFinanciera> cuentaFinancieraResponse = cuentaFinancieraFeign.listarCuentaFinancieraDtoPorId(estudiante.getIdCuentaFinanciera());
                if (cuentaFinancieraResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Cuenta Financiera con ID " + estudiante.getIdCuentaFinanciera() + " no existe");
                }
                estudiante.setCuentaFinanciera(cuentaFinancieraResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener la Cuenta Financiera con ID " + estudiante.getIdCuentaFinanciera(), e);
            }

            try {
                ResponseEntity<PlanificacionAcademica> planificacionAcademicaResponse = planificacionAcademicaFeign.buscarPlanificacionAcademicaPorId(estudiante.getIdCuentaFinanciera());
                if(planificacionAcademicaResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Planificacion Academica con ID " + estudiante.getIdCuentaFinanciera() + " no existe");
                }
                estudiante.setPlanificacionAcademica(planificacionAcademicaResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener la Planificacion Academica con ID " + estudiante.getIdCuentaFinanciera(), e);
            }
        });

        return estudiantes;
    }

    @Override
    public Estudiante buscarEstudiantePorId(Long id) {
        // Obtener el estudiante y validar su existencia
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante con ID " + id + " no encontrado"));

        try {

            // Obtener la persona asociada usando Feign
            Persona persona = personaFeign.listarPersonaDtoPorId(estudiante.getIdPersona()).getBody();
            if (persona == null) {
                throw new ResourceNotFoundException("Persona con ID " + estudiante.getIdPersona() + " no existe");
            }
            estudiante.setPersona(persona);

        } catch (FeignException e) {
            throw new RuntimeException("Error al comunicarse con el servicio externo", e);
        }

        try {
            ResponseEntity<CuentaFinanciera> cuentaFinancieraResponse = cuentaFinancieraFeign.listarCuentaFinancieraDtoPorId(estudiante.getIdCuentaFinanciera());
            if (cuentaFinancieraResponse.getBody() == null) {
                throw new ResourceNotFoundException("Cuenta Financiera con ID " + estudiante.getIdCuentaFinanciera() + " no existe");
            }
            estudiante.setCuentaFinanciera(cuentaFinancieraResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener la Cuenta Financiera con ID " + estudiante.getIdCuentaFinanciera(), e);
        }

        try {
            ResponseEntity<PlanificacionAcademica> planificacionAcademicaResponse = planificacionAcademicaFeign.buscarPlanificacionAcademicaPorId(estudiante.getIdPLanificacionAcademica());
            if(planificacionAcademicaResponse.getBody() == null) {
                throw new ResourceNotFoundException("Planificacion Academica con ID "+ estudiante.getIdPLanificacionAcademica()+" no encontrado");
            }
            estudiante.setPlanificacionAcademica(planificacionAcademicaResponse.getBody());
        }catch (FeignException e) {
            throw new RuntimeException("Error al obtener la Planificacion Academica con ID " + estudiante.getIdPLanificacionAcademica(), e);
        }

        return estudiante;
    }


    @Override
    public Estudiante editarEstudiante(Estudiante Estudiante) {
        return estudianteRepository.save(Estudiante);
    }

    @Override
    public void eliminarEstudiante(Long id) {
        estudianteRepository.deleteById(id);
    }

    @Override
    public Estudiante buscarPorCuentaFinanciera(Long id){
        return estudianteRepository.findByIdCuentaFinanciera(id);
    }

    @Override
    public Estudiante actualizarCodigo(Long idEstudiante, String codigo){
        Estudiante estudianteEncontrado = estudianteRepository.findById(idEstudiante).orElseThrow(() -> new ResourceNotFoundException("Estudiante con ID "+ idEstudiante +" no encontrado"));
        estudianteEncontrado.setCodigoUniversitario(codigo);
        return estudianteRepository.save(estudianteEncontrado);
    }
}
