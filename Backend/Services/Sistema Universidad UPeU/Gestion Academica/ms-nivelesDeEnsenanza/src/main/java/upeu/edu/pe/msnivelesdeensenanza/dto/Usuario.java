package upeu.edu.pe.msnivelesdeensenanza.dto;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class Usuario {
    private Long idUsuario;

    private String username; // Nombre de usuario único
    private String password; // Contraseña del usuario (se debe cifrar)
    private String email; // Email asociado al usuario
    private boolean enabled; // Indica si el usuario está activo o no

    private long idRol;
    private Rol rol;

    private LocalDateTime ultimoLogin; // Última fecha de acceso del usuario

    private String tokenRecuperacion; // Token para la recuperación de contraseña
    private Instant tokenRecuperacionExpiracion; // Fecha de expiración del token de recuperación

    private LocalDateTime fechaCreacionUsuario;
    private LocalDateTime fechaModificacionUsuario;
}
