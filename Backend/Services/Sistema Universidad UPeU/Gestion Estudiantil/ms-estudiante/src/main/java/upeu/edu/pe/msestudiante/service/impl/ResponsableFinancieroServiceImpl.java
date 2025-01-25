package upeu.edu.pe.msestudiante.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msestudiante.entity.ResponsableFinanciero;
import upeu.edu.pe.msestudiante.repository.ResponsableFinancieroRepository;
import upeu.edu.pe.msestudiante.service.ResponsableFinancieroService;

import java.util.List;

@Service
public class ResponsableFinancieroServiceImpl implements ResponsableFinancieroService {
    @Autowired
    private ResponsableFinancieroRepository responsableFinancieroRepository;

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
}
