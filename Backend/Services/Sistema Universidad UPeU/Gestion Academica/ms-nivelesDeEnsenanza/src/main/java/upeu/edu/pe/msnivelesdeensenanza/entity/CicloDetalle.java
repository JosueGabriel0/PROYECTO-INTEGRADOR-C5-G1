package upeu.edu.pe.msnivelesdeensenanza.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import upeu.edu.pe.msnivelesdeensenanza.dto.Ciclo;
import upeu.edu.pe.msnivelesdeensenanza.dto.EstadoCiclo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ciclo_detalle")
@Data
public class CicloDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCicloDetalle;

    @ManyToOne
    @JoinColumn(name = "opcion_nivel_id")
    @JsonBackReference
    private OpcionNivel opcionNivel; // Relación: Uno a Muchos con OpcionNivel

    private Long idCiclo;
    @Transient
    private Ciclo ciclo;

    private int numeroDeGrupos;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    @OneToMany(mappedBy = "cicloDetalle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CursoDetalle> cursoDetalles; // Relación: Uno a Muchos con CursoDetalle

    private LocalDateTime fechaCreacionCicloDetalle;
    private LocalDateTime fechaModificacionCicloDetalle;

    @PrePersist
    public void onCreate(){
        fechaCreacionCicloDetalle = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionCicloDetalle = LocalDateTime.now();
    }
}
