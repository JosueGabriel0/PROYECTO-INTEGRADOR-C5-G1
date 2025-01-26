package upeu.edu.pe.msnivelesdeensenanza.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msnivelesdeensenanza.dto.Ciclo;
import upeu.edu.pe.msnivelesdeensenanza.entity.CicloDetalle;
import upeu.edu.pe.msnivelesdeensenanza.feign.PlanificacionAcademicaFeign;
import upeu.edu.pe.msnivelesdeensenanza.repository.CicloDetalleRepository;
import upeu.edu.pe.msnivelesdeensenanza.service.CicloDetalleService;

import java.util.List;

@Service
public class CicloDetalleSerivceImpl implements CicloDetalleService {

    @Autowired
    private CicloDetalleRepository cicloDetalleRepository;
    @Autowired
    private PlanificacionAcademicaFeign planificacionAcademicaFeign;

    @Override
    public List<CicloDetalle> listarTodos() {
        List<CicloDetalle> ciclosDetalles = cicloDetalleRepository.findAll();

        ciclosDetalles.forEach((cicloDetalle) -> {
            try {
                ResponseEntity<Ciclo> cicloResponse = planificacionAcademicaFeign.listarCicloPorId(cicloDetalle.getIdCiclo());
                if(cicloResponse.getBody() == null) {
                    throw new IllegalArgumentException("Ciclo con ID " + cicloDetalle.getIdCiclo() + " no existe");
                }
                cicloDetalle.setCiclo(cicloResponse.getBody());
            } catch (FeignException e) {
                throw new IllegalArgumentException("Error al comunicarse con el servicio de Ciclo", e);
            }
        });

        return ciclosDetalles;
    }

    @Override
    public CicloDetalle obtenerPorId(Long id) {
        CicloDetalle cicloDetalleEncontrado = cicloDetalleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("El ciclo con ID " + id + " no existe"));
        try {
            ResponseEntity<Ciclo> cicloResponse = planificacionAcademicaFeign.listarCicloPorId(cicloDetalleEncontrado.getIdCiclo());
            if(cicloResponse.getBody() == null) {
                throw new IllegalArgumentException("El ciclo con ID " + cicloDetalleEncontrado.getIdCiclo() + " no existe.");
            }
            cicloDetalleEncontrado.setCiclo(cicloResponse.getBody());
        } catch (FeignException e){
            throw new IllegalArgumentException("Error al comunicarse con el servicio de Ciclo", e);
        }
        return cicloDetalleEncontrado;
    }

    @Override
    public CicloDetalle crear(CicloDetalle cicloDetalle) {
        return cicloDetalleRepository.save(cicloDetalle);
    }

    @Override
    public CicloDetalle actualizar(CicloDetalle cicloDetalle) {
        return cicloDetalleRepository.save(cicloDetalle);
    }

    @Override
    public void eliminar(Long id) {
        cicloDetalleRepository.deleteById(id);
    }
}
