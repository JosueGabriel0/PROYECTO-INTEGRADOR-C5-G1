package upeu.edu.pe.msnivelesdeensenanza.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.msnivelesdeensenanza.entity.NivelEnsenanza;
import upeu.edu.pe.msnivelesdeensenanza.repository.NivelEnsenanzaRepository;
import upeu.edu.pe.msnivelesdeensenanza.service.NivelEnsenanzaService;

import java.util.List;

@Service
public class NivelEnsenanzaServiceImpl implements NivelEnsenanzaService {

    @Autowired
    private NivelEnsenanzaRepository nivelEnsenanzaRepository;

    @Override
    public List<NivelEnsenanza> obtenerNiveles() {
        return nivelEnsenanzaRepository.findAll();
    }

    @Override
    public NivelEnsenanza obtenerPorId(Long id) {
        return nivelEnsenanzaRepository.findById(id).orElseThrow(() -> new RuntimeException("Nivel no encontrado"));
    }

    @Override
    public NivelEnsenanza crear(NivelEnsenanza nivelEnsenanza) {
        return nivelEnsenanzaRepository.save(nivelEnsenanza);
    }

    @Override
    public NivelEnsenanza actualizar(Long id, NivelEnsenanza nivelEnsenanzaActualizado) {
        NivelEnsenanza nivelExistente = obtenerPorId(id);
        nivelExistente.setNombre(nivelEnsenanzaActualizado.getNombre());
        nivelExistente.setDescripcion(nivelEnsenanzaActualizado.getDescripcion());
        return nivelEnsenanzaRepository.save(nivelExistente);
    }

    @Override
    public void eliminar(Long id) {
        nivelEnsenanzaRepository.deleteById(id);
    }

    @Override
    public NivelEnsenanza obtenerNivelEnsenanzaPorIdOpcionNivel(Long idOpcionNivel) {
        return nivelEnsenanzaRepository.findNivelEnsenanzaByOpcionNivelId(idOpcionNivel);
    }
}
