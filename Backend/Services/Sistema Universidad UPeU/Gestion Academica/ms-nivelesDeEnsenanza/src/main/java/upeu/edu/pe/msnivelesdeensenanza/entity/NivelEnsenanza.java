package upeu.edu.pe.msnivelesdeensenanza.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "nivel_ensenanza")
@Data
public class NivelEnsenanza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNivelEnsenanza;

    private String nombre;
    private String descripcion;

    @OneToMany(mappedBy = "nivelEnsenanza", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OpcionNivel> opcionesNivel;

    private LocalDateTime fechaCreacionNivelEnsenanza;
    private LocalDateTime fechaModificacionNivelEnsenanza;

    @PrePersist
    public void onCreate(){
        fechaCreacionNivelEnsenanza = java.time.LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionNivelEnsenanza = java.time.LocalDateTime.now();
    }

    // Getters y setters
}