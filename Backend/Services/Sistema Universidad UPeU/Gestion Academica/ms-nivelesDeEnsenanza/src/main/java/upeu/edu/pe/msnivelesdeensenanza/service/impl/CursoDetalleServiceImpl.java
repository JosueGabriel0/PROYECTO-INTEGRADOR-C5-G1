package upeu.edu.pe.msnivelesdeensenanza.service.impl;

import feign.FeignException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msnivelesdeensenanza.dto.Curso;
import upeu.edu.pe.msnivelesdeensenanza.dto.CursoDetalleRequest;
import upeu.edu.pe.msnivelesdeensenanza.entity.CicloDetalle;
import upeu.edu.pe.msnivelesdeensenanza.entity.CursoDetalle;
import upeu.edu.pe.msnivelesdeensenanza.feign.CursoFeign;
import upeu.edu.pe.msnivelesdeensenanza.repository.CursoDetalleRepository;
import upeu.edu.pe.msnivelesdeensenanza.service.CursoDetalleService;

import java.util.List;

@Service
public class CursoDetalleServiceImpl implements CursoDetalleService {

    @Autowired
    private CursoDetalleRepository cursoDetalleRepository;
    @Autowired
    private CursoFeign cursoFeign;

    @Override
    public List<CursoDetalle> listarTodos() {
        List<CursoDetalle> cursosDetalles = cursoDetalleRepository.findAll();
        cursosDetalles.forEach((cursoDetalle) -> {
            try {
                ResponseEntity<Curso> cursoResponse = cursoFeign.listarCursoPorId(cursoDetalle.getIdCurso());
                if(cursoResponse.getBody() == null) {
                    throw new IllegalArgumentException("El curso con ID" + cursoDetalle.getIdCurso() + " no existe.");
                }
                cursoDetalle.setCurso(cursoResponse.getBody());
            } catch (FeignException e){
                throw new IllegalArgumentException("Error al comunicarse con el servicio de Curso", e);
            }
        });

        return cursosDetalles;
    }

    @Override
    public CursoDetalle obtenerPorId(Long id) {
        CursoDetalle cursoDetalleEncontrado = cursoDetalleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Curso detalle con ID" + id + " no existe."));
        try {
            ResponseEntity<Curso> cursoResponse = cursoFeign.listarCursoPorId(cursoDetalleEncontrado.getIdCurso());
            if(cursoResponse.getBody() == null) {
                throw new IllegalArgumentException("El curso con ID" + cursoDetalleEncontrado.getIdCurso() + " no existe.");
            }
            cursoDetalleEncontrado.setCurso(cursoResponse.getBody());
        } catch (FeignException e){
            throw new IllegalArgumentException("Error al comunicarse con el servicio de Curso", e);
        }
        return cursoDetalleEncontrado;
    }

    @Override
    public CursoDetalle crear(CursoDetalle cursoDetalle) {
        return cursoDetalleRepository.save(cursoDetalle);
    }

    @Override
    public CursoDetalle actualizar(CursoDetalle cursoDetalle) {
        return cursoDetalleRepository.save(cursoDetalle);
    }

    @Override
    public void eliminar(Long id) {
        cursoDetalleRepository.deleteById(id);
    }

    @Override
    public List<CursoDetalle> buscarPorIds(List<Long> idsCursoDetalle){
        if(idsCursoDetalle == null || idsCursoDetalle.isEmpty()) {
            throw new IllegalArgumentException("La lista de ids del curso detalle no puede ser vacia.");
        }

        List<CursoDetalle> cursosDetallesEncontrados = cursoDetalleRepository.findAllById(idsCursoDetalle);
        cursosDetallesEncontrados.forEach((cursoDetalle) -> {
            try {
                ResponseEntity<Curso> cursoResponse = cursoFeign.listarCursoPorId(cursoDetalle.getIdCurso());
                if(cursoResponse.getBody() == null) {
                    throw new IllegalArgumentException("El curso con ID " + cursoDetalle.getIdCurso() + "no existe");
                }
                cursoDetalle.setCurso(cursoResponse.getBody());
            } catch (FeignException e){
                throw new IllegalArgumentException("Error al comunicarse con el servicio de Curso", e);
            }
        });
        return cursosDetallesEncontrados;
    }

    @Override
    @Transactional
    public CursoDetalle restarCupoCursoDetalle(CursoDetalleRequest cursoDetalleRequest){
        Long cursoDetalleIdOperacion = cursoDetalleRequest.getCursoDetalleIdOperacion();
        CursoDetalle cursoDetalleEncontrado = cursoDetalleRepository.findById(cursoDetalleIdOperacion).orElseThrow(() -> new IllegalArgumentException("Curso detalle con ID " + cursoDetalleIdOperacion + " no existe"));
        if(cursoDetalleEncontrado.getCupos() > 0) {
            cursoDetalleEncontrado.setCupos(cursoDetalleEncontrado.getCupos() - 1);
            return cursoDetalleRepository.save(cursoDetalleEncontrado);
        } else {
            throw new RuntimeException("No hay cupos disponibles");
        }
    }

    @Override
    @Transactional
    public CursoDetalle sumarCupoCursoDetalle(CursoDetalleRequest cursoDetalleRequest){
        Long cursoDetalleIdOperacion = cursoDetalleRequest.getCursoDetalleIdOperacion();
        CursoDetalle cursoDetalleEncontrado = cursoDetalleRepository.findById(cursoDetalleIdOperacion).orElseThrow(() -> new IllegalArgumentException("Curso detalle con ID " + cursoDetalleIdOperacion + " no existe"));

        cursoDetalleEncontrado.setCupos(cursoDetalleEncontrado.getCupos() + 1);
        return cursoDetalleRepository.save(cursoDetalleEncontrado);
    }
}