package upeu.edu.pe.msmatriculas.service.impl;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msmatriculas.dto.*;
import upeu.edu.pe.msmatriculas.entity.EstadoMatricula;
import upeu.edu.pe.msmatriculas.entity.Matricula;
import upeu.edu.pe.msmatriculas.exception.ResourceNotFoundException;
import upeu.edu.pe.msmatriculas.feign.*;
import upeu.edu.pe.msmatriculas.repository.MatriculaRepository;
import upeu.edu.pe.msmatriculas.service.MatriculaService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatriculaServiceImpl implements MatriculaService {

    private final MatriculaRepository matriculaRepository;

    // Feign Clients
    @Autowired
    private EstudianteFeign estudianteFeign;
    @Autowired
    private CarreraFeign carreraFeign;
    @Autowired
    private CalendarioAcademicoFeign calendarioAcademicoFeign;
    @Autowired
    private PagoFeign pagoFeign;
    @Autowired
    private RequisitoFeign requisitoFeign;
    @Autowired
    private AdministrativoFeign administrativoFeign;
    @Autowired
    private DocenteFeign docenteFeign;
    @Autowired
    private CursoFeign cursoFeign;
    @Autowired
    private InscripcionFeign inscripcionFeign;
    @Autowired
    private NivelEnsenanzaFeign nivelEnsenanzaFeign;

    // Crear nueva matrícula con validaciones adicionales
    @Override
    public Matricula crearMatricula(Matricula matricula) {
        return matriculaRepository.save(matricula);
    }

    // Obtener matrícula por ID
    @Override
    public Matricula obtenerMatriculaPorId(Long idMatricula) {
        // Buscar la matricula por ID en el repositorio
        Matricula matricula = matriculaRepository.findById(idMatricula).orElseThrow(() -> new ResourceNotFoundException("Matricula con ID " + idMatricula + " no existe"));

        try {
            // Obtener el Nivel de Ensenanza del usuario usando Feign
            ResponseEntity<NivelEnsenanza> nivelEnsenanzaResponse = nivelEnsenanzaFeign.listarNivelDeEnsenanzaDtoPorId(matricula.getIdNivelEnsenanza());
            if (nivelEnsenanzaResponse.getBody() == null) {
                // Manejar el caso en el que el rol no existe
                throw new ResourceNotFoundException("Nivel de Ensenanza con ID " + matricula.getIdNivelEnsenanza() + " no existe");
            }
            matricula.setNivelEnsenanza(nivelEnsenanzaResponse.getBody());
        } catch (FeignException e) {
            // Manejar el error en el servidor de OpenFeign para rol
            throw new RuntimeException("Error al obtener el Nivel de Ensenanza con ID " + matricula.getIdNivelEnsenanza(), e);
        }

        try {
            // Obtener el Nivel de Ensenanza del usuario usando Feign
            ResponseEntity<OpcionNivel> opcionNivelResponse = nivelEnsenanzaFeign.listarOpcionNivelDtoPorId(matricula.getIdOpcionNivel());
            if (opcionNivelResponse.getBody() == null) {
                // Manejar el caso en el que el rol no existe
                throw new ResourceNotFoundException("Opcion Nivel con ID " + matricula.getIdOpcionNivel() + " no existe");
            }
            matricula.setOpcionNivel(opcionNivelResponse.getBody());
        } catch (FeignException e) {
            // Manejar el error en el servidor de OpenFeign para rol
            throw new RuntimeException("Error al obtener la Opcion Nivel con ID " + matricula.getIdOpcionNivel(), e);
        }

        try {
            ResponseEntity<Estudiante> estudianteResponse = estudianteFeign.listarEstudianteDtoPorId(matricula.getIdEstudiante());
            if (estudianteResponse.getBody() == null) {
                throw new ResourceNotFoundException("Estudiante con ID " + matricula.getIdEstudiante() + " no existe");
            }
            matricula.setEstudiante(estudianteResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Estudiante con ID " + matricula.getIdEstudiante(), e);
        }

        try {
            ResponseEntity<Carrera> carreraResponse = carreraFeign.listarCarreraDtoPorId(matricula.getIdCarrera());
            if (carreraResponse.getBody() == null) {
                throw new ResourceNotFoundException("Carrera con ID " + matricula.getIdCarrera() + " no existe");
            }
            matricula.setCarrera(carreraResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener la Carrera con ID " + matricula.getIdCarrera(), e);
        }

        try {
            ResponseEntity<CalendarioAcademico> calendarioAcademicoResponse = calendarioAcademicoFeign.listarCalendarioAcademicoDtoPorId(matricula.getIdCalendarioAcademico());
            if (calendarioAcademicoResponse.getBody() == null) {
                throw new ResourceNotFoundException("Rol con ID " + matricula.getIdCalendarioAcademico() + " no existe");
            }
            matricula.setCalendarioAcademico(calendarioAcademicoResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Rol con ID " + matricula.getIdCalendarioAcademico(), e);
        }

        try {

            ResponseEntity<Pago> pagoResponse = pagoFeign.listarPagoDtoPorId(matricula.getIdPago());
            if (pagoResponse.getBody() == null) {
                throw new ResourceNotFoundException("Pago con ID " + matricula.getIdPago() + " no existe");
            }
            matricula.setPago(pagoResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Pago con ID " + matricula.getIdPago(), e);
        }

        try {

            ResponseEntity<Requisito> requisitoResponse = requisitoFeign.listarRequisitoDtoPorId(matricula.getIdRequisito());
            if (requisitoResponse.getBody() == null) {
                throw new ResourceNotFoundException("Requisito con ID " + matricula.getIdRequisito() + " no existe");
            }
            matricula.setRequisito(requisitoResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Requisito con ID " + matricula.getIdRequisito(), e);
        }

        try {

            ResponseEntity<Administrativo> administrativoResponse = administrativoFeign.listarAdministrativoDtoPorId(matricula.getIdAdministrativo());
            if (administrativoResponse.getBody() == null) {
                throw new ResourceNotFoundException("Administrativo con ID " + matricula.getIdAdministrativo() + " no existe");
            }
            matricula.setAdministrativo(administrativoResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Administrativo con ID " + matricula.getIdAdministrativo(), e);
        }

        try {

            ResponseEntity<Ciclo> cicloResponse = nivelEnsenanzaFeign.listarCicloDtoPorId(matricula.getIdCiclo());
            if (cicloResponse.getBody() == null) {
                throw new ResourceNotFoundException("Ciclo con ID " + matricula.getIdCiclo() + " no existe");
            }
            matricula.setCiclo(cicloResponse.getBody());
        } catch (FeignException e) {
            throw new RuntimeException("Error al obtener el Ciclo con ID " + matricula.getIdCiclo(), e);
        }

        return matricula;
    }

    // Obtener todas las matrículas
    @Override
    public List<Matricula> obtenerMatriculas() {
        List<Matricula> matriculas = matriculaRepository.findAll();

        matriculas.forEach(matricula -> {
            try {
                // Obtener el Nivel de Ensenanza del usuario usando Feign
                ResponseEntity<NivelEnsenanza> nivelEnsenanzaResponse = nivelEnsenanzaFeign.listarNivelDeEnsenanzaDtoPorId(matricula.getIdNivelEnsenanza());
                if (nivelEnsenanzaResponse.getBody() == null) {
                    // Manejar el caso en el que el rol no existe
                    throw new ResourceNotFoundException("Nivel de Ensenanza con ID " + matricula.getIdNivelEnsenanza() + " no existe");
                }
                matricula.setNivelEnsenanza(nivelEnsenanzaResponse.getBody());
            } catch (FeignException e) {
                // Manejar el error en el servidor de OpenFeign para rol
                throw new RuntimeException("Error al obtener el Nivel de Ensenanza con ID " + matricula.getIdNivelEnsenanza(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {
                // Obtener el Nivel de Ensenanza del usuario usando Feign
                ResponseEntity<OpcionNivel> opcionNivelResponse = nivelEnsenanzaFeign.listarOpcionNivelDtoPorId(matricula.getIdOpcionNivel());
                if (opcionNivelResponse.getBody() == null) {
                    // Manejar el caso en el que el rol no existe
                    throw new ResourceNotFoundException("Opcion Nivel con ID " + matricula.getIdOpcionNivel() + " no existe");
                }
                matricula.setOpcionNivel(opcionNivelResponse.getBody());
            } catch (FeignException e) {
                // Manejar el error en el servidor de OpenFeign para rol
                throw new RuntimeException("Error al obtener la Opcion Nivel con ID " + matricula.getIdOpcionNivel(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {
                ResponseEntity<Estudiante> estudianteResponse = estudianteFeign.listarEstudianteDtoPorId(matricula.getIdEstudiante());
                if (estudianteResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Estudiante con ID " + matricula.getIdEstudiante() + " no existe");
                }
                matricula.setEstudiante(estudianteResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Estudiante con ID " + matricula.getIdEstudiante(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {
                ResponseEntity<Carrera> carreraResponse = carreraFeign.listarCarreraDtoPorId(matricula.getIdCarrera());
                if (carreraResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Carrera con ID " + matricula.getIdCarrera() + " no existe");
                }
                matricula.setCarrera(carreraResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener la Carrera con ID " + matricula.getIdCarrera(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {
                ResponseEntity<CalendarioAcademico> calendarioAcademicoResponse = calendarioAcademicoFeign.listarCalendarioAcademicoDtoPorId(matricula.getIdCalendarioAcademico());
                if (calendarioAcademicoResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Rol con ID " + matricula.getIdCalendarioAcademico() + " no existe");
                }
                matricula.setCalendarioAcademico(calendarioAcademicoResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Rol con ID " + matricula.getIdCalendarioAcademico(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {

                ResponseEntity<Pago> pagoResponse = pagoFeign.listarPagoDtoPorId(matricula.getIdPago());
                if (pagoResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Pago con ID " + matricula.getIdPago() + " no existe");
                }
                matricula.setPago(pagoResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Pago con ID " + matricula.getIdPago(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {

                ResponseEntity<Requisito> requisitoResponse = requisitoFeign.listarRequisitoDtoPorId(matricula.getIdRequisito());
                if (requisitoResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Requisito con ID " + matricula.getIdRequisito() + " no existe");
                }
                matricula.setRequisito(requisitoResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Requisito con ID " + matricula.getIdRequisito(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {

                ResponseEntity<Administrativo> administrativoResponse = administrativoFeign.listarAdministrativoDtoPorId(matricula.getIdAdministrativo());
                if (administrativoResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Administrativo con ID " + matricula.getIdAdministrativo() + " no existe");
                }
                matricula.setAdministrativo(administrativoResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Administrativo con ID " + matricula.getIdAdministrativo(), e);
            }
        });

        matriculas.forEach(matricula -> {
            try {

                ResponseEntity<Ciclo> cicloResponse = nivelEnsenanzaFeign.listarCicloDtoPorId(matricula.getIdCiclo());
                if (cicloResponse.getBody() == null) {
                    throw new ResourceNotFoundException("Ciclo con ID " + matricula.getIdCiclo() + " no existe");
                }
                matricula.setCiclo(cicloResponse.getBody());
            } catch (FeignException e) {
                throw new RuntimeException("Error al obtener el Ciclo con ID " + matricula.getIdCiclo(), e);
            }
        });

        return matriculaRepository.findAll();
    }

    // Actualizar matrícula con validaciones adicionales
    @Override
    public Matricula actualizarMatricula(Matricula matricula) {
        return matriculaRepository.save(matricula);
    }

    // Eliminar matrícula con validación de estado
    @Override
    public void eliminarMatricula(Long idMatricula) {
        Matricula matricula = obtenerMatriculaPorId(idMatricula);
        if (matricula.getEstado() != EstadoMatricula.PENDIENTE) {
            throw new RuntimeException("Solo las matrículas pendientes pueden ser eliminadas.");
        }
        matriculaRepository.deleteById(idMatricula);
    }

    @Override
    public boolean validarEstudiante(Long idInscripcion) {
        Inscripcion inscripcionResponse = inscripcionFeign.listarInscripcionPorId(idInscripcion).getBody();

        // Verificar nullabilidad
        if (inscripcionResponse != null && inscripcionResponse.getRol() != null && "ESTUDIANTE".equals(inscripcionResponse.getRol().getNombreRol())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Matricula buscarMatriculaPorIdEstudiante(Long idEstudiante){
        return matriculaRepository.findByIdEstudiante(idEstudiante);
    }

}