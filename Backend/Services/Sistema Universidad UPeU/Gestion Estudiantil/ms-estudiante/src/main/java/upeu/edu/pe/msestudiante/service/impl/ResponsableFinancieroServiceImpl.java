package upeu.edu.pe.msestudiante.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msestudiante.entity.Estudiante;
import upeu.edu.pe.msestudiante.entity.ResponsableFinanciero;
import upeu.edu.pe.msestudiante.repository.EstudianteRepository;
import upeu.edu.pe.msestudiante.repository.ResponsableFinancieroRepository;
import upeu.edu.pe.msestudiante.service.ResponsableFinancieroService;

import java.util.List;

@Service
public class ResponsableFinancieroServiceImpl implements ResponsableFinancieroService {
    @Autowired
    private ResponsableFinancieroRepository responsableFinancieroRepository;
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public ResponsableFinanciero guardarResponsableFinanciero(ResponsableFinanciero responsableFinanciero) {
        return responsableFinancieroRepository.save(responsableFinanciero);
    }

    @Override
    public List<ResponsableFinanciero> listarResponsablesFinancieros() {
        return responsableFinancieroRepository.findAll();
    }

    @Override
    public ResponsableFinanciero buscarResponsableFinancieroPorId(Long id) {
        return responsableFinancieroRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("El responsable financiero con ID " + id + " no existe"));
    }

    @Override
    public ResponsableFinanciero editarResponsableFinanciero(ResponsableFinanciero responsableFinanciero) {
        return responsableFinancieroRepository.save(responsableFinanciero);
    }

    @Override
    public void eliminarEstudiante(Long id) {
        responsableFinancieroRepository.deleteById(id);
    }

    @Override
    public ResponsableFinanciero guardarResponsableFinancieroParaEstudiante(Long idEstudiante, ResponsableFinanciero responsableFinanciero){
        Estudiante estudianteEncontrado = estudianteRepository.findById(idEstudiante).orElseThrow(() -> new IllegalArgumentException("El estudiante con ID " + idEstudiante + " no existe"));

        estudianteEncontrado.setResponsableFinanciero(responsableFinanciero);
        responsableFinanciero.setEstudiante(estudianteEncontrado);

        ResponsableFinanciero nuevoResponsableFinanciero = responsableFinancieroRepository.save(responsableFinanciero);
        estudianteRepository.save(estudianteEncontrado);

        return nuevoResponsableFinanciero;
    }
}
