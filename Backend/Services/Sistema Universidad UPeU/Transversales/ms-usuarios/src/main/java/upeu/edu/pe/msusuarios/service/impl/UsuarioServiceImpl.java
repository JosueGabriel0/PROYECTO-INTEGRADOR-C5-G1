package upeu.edu.pe.msusuarios.service.impl;

import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; // Importa PasswordEncoder
import org.springframework.stereotype.Service;
import upeu.edu.pe.msusuarios.dto.Rol;
import upeu.edu.pe.msusuarios.entity.Usuario;
import upeu.edu.pe.msusuarios.exception.ResourceNotFoundException;
import upeu.edu.pe.msusuarios.feign.RolFeign;
import upeu.edu.pe.msusuarios.repository.UsuarioRepository;
import upeu.edu.pe.msusuarios.service.UsuarioService;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolFeign rolFeign;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyección del PasswordEncoder

    @Override
    public Usuario guardarUsuario(Usuario usuario) {
        // Cifrar la contraseña antes de guardar
        String passwordCifrada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordCifrada);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario buscarUsuarioPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario con username " + username + " no existe"));
    }

    @Override
    public List<Usuario> listarUsuario() {
        List<Usuario> usuarios = usuarioRepository.findAll();

        // Recorremos cada usuario y asignamos el rol
        usuarios.forEach(usuario -> {
            try {
                ResponseEntity<Rol> rolResponse = rolFeign.listarRolDtoPorId(usuario.getIdRol());
                if (rolResponse.getBody() == null) {
                    // Manejar el caso en el que el rol no existe
                    throw new ResourceNotFoundException("Rol con ID " + usuario.getIdRol() + " no existe");
                }
                usuario.setRol(rolResponse.getBody());
            } catch (FeignException e) {
                // Manejar el error en el servidor de OpenFeign para rol
                throw new RuntimeException("Error al obtener el Rol con ID " + usuario.getIdRol(), e);
            }
        });

        return usuarios;
    }

    @Override
    public Usuario buscarUsuarioPorId(Long id) {
        // Buscar el usuario por ID en el repositorio
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario con ID " + id + " no existe"));

        try {
            // Obtener el rol del usuario usando Feign
            ResponseEntity<Rol> rolResponse = rolFeign.listarRolDtoPorId(usuario.getIdRol());
            if (rolResponse.getBody() == null) {
                // Manejar el caso en el que el rol no existe
                throw new ResourceNotFoundException("Rol con ID " + usuario.getIdRol() + " no existe");
            }
            usuario.setRol(rolResponse.getBody());
        } catch (FeignException e) {
            // Manejar el error en el servidor de OpenFeign para rol
            throw new RuntimeException("Error al obtener el Rol con ID " + usuario.getIdRol(), e);
        }

        return usuario;
    }

    @Override
    public Usuario editarUsuario(Usuario usuario) {
        // Si se edita la contraseña, cifrarla antes de guardar
        if (usuario.getPassword() != null) {
            String passwordCifrada = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(passwordCifrada);
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}