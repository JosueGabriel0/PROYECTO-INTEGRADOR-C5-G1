package upeu.edu.pe.msnivelesdeensenanza.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msnivelesdeensenanza.dto.Curso;
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
}
