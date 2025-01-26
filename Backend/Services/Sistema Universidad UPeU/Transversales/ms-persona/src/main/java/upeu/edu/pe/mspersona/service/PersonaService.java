package upeu.edu.pe.mspersona.service;

import upeu.edu.pe.mspersona.entity.Persona;

import java.util.List;

public interface PersonaService {

    public Persona guardarPersona(Persona persona);

    public List<Persona> listarPersona();

    public Persona buscarPersonaPorId(Long id);

    public Persona editarPersona(Persona persona);

    public void eliminarPersona(Long id);

    public Persona actualizarDatosEspecificos(Long idPersona, Persona personaActualizada);
}
