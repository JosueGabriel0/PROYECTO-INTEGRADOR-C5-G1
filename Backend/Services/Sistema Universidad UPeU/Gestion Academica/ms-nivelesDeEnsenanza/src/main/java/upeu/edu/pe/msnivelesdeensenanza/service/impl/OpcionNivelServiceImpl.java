package upeu.edu.pe.msnivelesdeensenanza.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msnivelesdeensenanza.dto.Carrera;
import upeu.edu.pe.msnivelesdeensenanza.dto.PlanificacionAcademica;
import upeu.edu.pe.msnivelesdeensenanza.entity.OpcionNivel;
import upeu.edu.pe.msnivelesdeensenanza.exception.ResourceNotFoundException;
import upeu.edu.pe.msnivelesdeensenanza.feign.CarreraFeign;
import upeu.edu.pe.msnivelesdeensenanza.feign.PlanificacionAcademicaFeign;
import upeu.edu.pe.msnivelesdeensenanza.repository.OpcionNivelRepository;
import upeu.edu.pe.msnivelesdeensenanza.service.OpcionNivelService;

import java.util.List;

@Service
public class OpcionNivelServiceImpl implements OpcionNivelService {

    @Autowired
    private OpcionNivelRepository opcionNivelRepository;

    @Autowired
    private CarreraFeign carreraFeign;
    @Autowired
    private PlanificacionAcademicaFeign planificacionAcademicaFeign;

    @Override
    public List<OpcionNivel> obtenerOpcionesPorNivel(Long nivelId) {
        return opcionNivelRepository.findByNivelEnsenanzaIdNivelEnsenanza(nivelId);
    }

    @Override
    public List<OpcionNivel> listarTodos() {
        List<OpcionNivel> opcionesNivel = opcionNivelRepository.findAll();

        // Recorremos cada usuario y asignamos el rol
        opcionesNivel.forEach(opcionNivel -> {
            try {
                ResponseEntity<Carrera> carreraResponse = carreraFeign.listarCarreraDtoPorId(opcionNivel.getIdCarrera());
                if (carreraResponse.getBody() == null) {
                    // Manejar el caso en el que la carrera no existe
                    throw new ResourceNotFoundException("Carrera con ID " + opcionNivel.getIdCarrera() + " no existe");
                }
                opcionNivel.setCarrera(carreraResponse.getBody());
            } catch (FeignException e) {
                // Manejar el error en el servidor de OpenFeign para rol
                throw new RuntimeException("Error al obtener la carrera con ID " + opcionNivel.getIdCarrera(), e);
            }

            try {
                ResponseEntity<PlanificacionAcademica> planificacionAcademicaResponse = planificacionAcademicaFeign.listarPlanificacionAcademicaDtoPorId(opcionNivel.getIdPLanificacionAcademica());
                if (planificacionAcademicaResponse.getBody() == null) {
                    // Manejar el caso en el que la planificacion academica no existe
                    throw new ResourceNotFoundException("Planificacion Academica con ID " + opcionNivel.getIdPLanificacionAcademica() + " no existe");
                }
                opcionNivel.setPlanificacionAcademica(planificacionAcademicaResponse.getBody());
            } catch (FeignException e) {
                // Manejar el error en el servidor de OpenFeign para rol
                throw new RuntimeException("Error al obtener la planiicacion academica con ID " + opcionNivel.getIdPLanificacionAcademica(), e);
            }
        });

        return opcionesNivel;
    }

    @Override
    public OpcionNivel obtenerPorId(Long id) {
        // Buscar la OpcionNivel por ID en el repositorio
        OpcionNivel opcionNivel = opcionNivelRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OpcionNivel con ID " + id + " no existe"));

        try {
            // Obtener la carrera de la opcionNivel usando Feign
            ResponseEntity<Carrera> carreraResponse = carreraFeign.listarCarreraDtoPorId(opcionNivel.getIdCarrera());
            if (carreraResponse.getBody() == null) {
                // Manejar el caso en el que la carrera no existe
                throw new ResourceNotFoundException("Carrera con ID " + opcionNivel.getIdCarrera() + " no existe");
            }
            opcionNivel.setCarrera(carreraResponse.getBody());
        } catch (FeignException e) {
            // Manejar el error en el servidor de OpenFeign para rol
            throw new RuntimeException("Error al obtener la carrera con ID " + opcionNivel.getIdCarrera(), e);
        }

        try {
            // Obtener la planificacion Academica de la opcionNivel usando Feign
            ResponseEntity<PlanificacionAcademica> planificacionAcademicaResponse = planificacionAcademicaFeign.listarPlanificacionAcademicaDtoPorId(opcionNivel.getIdPLanificacionAcademica());
            if (planificacionAcademicaResponse.getBody() == null) {
                // Manejar el caso en el que la carrera no existe
                throw new ResourceNotFoundException("Planificacion Academica con ID " + opcionNivel.getIdPLanificacionAcademica() + " no existe");
            }
            opcionNivel.setPlanificacionAcademica(planificacionAcademicaResponse.getBody());
        } catch (FeignException e) {
            // Manejar el error en el servidor de OpenFeign para rol
            throw new RuntimeException("Error al obtener la planificacion academica con ID " + opcionNivel.getIdPLanificacionAcademica(), e);
        }

        return opcionNivel;
    }

    @Override
    public OpcionNivel crear(OpcionNivel opcionNivel) {
        return opcionNivelRepository.save(opcionNivel);
    }

    @Override
    public OpcionNivel actualizar(OpcionNivel opcionNivel) {
        return opcionNivelRepository.save(opcionNivel);
    }

    @Override
    public void eliminar(Long id) {
        opcionNivelRepository.deleteById(id);
    }

    @Override
    public List<OpcionNivel> listarOpcionesPorCarreras(List<Long> carrerasIds) {
        return opcionNivelRepository.findByIdCarreraIn(carrerasIds);
    }
}