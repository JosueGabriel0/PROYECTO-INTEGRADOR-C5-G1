package upeu.edu.pe.msnivelesdeensenanza.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import upeu.edu.pe.msnivelesdeensenanza.dto.Curso;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "curso_detalle")
@Data
public class CursoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCursoDetalle;

    @ManyToOne
    @JoinColumn(name = "ciclo_detalle_id")
    @JsonBackReference
    private CicloDetalle cicloDetalle; // Relación: Uno a Muchos con CicloDetalle

    private Long idCurso;
    @Transient
    private Curso curso;

    private String grupo;
    private BigDecimal costoTotalPorCreditos;

    private Integer cupos;
    private Integer cuposDisponibles;

    @ElementCollection
    @CollectionTable(name = "docentes_ids", joinColumns = @JoinColumn(name = "entidad_id"))
    @Column(name = "docente_id")
    private List<Long> idsDocentes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "horario_id", referencedColumnName = "idHorario")
    @JsonManagedReference
    private Horario horario;

    private LocalDateTime fechaCreacionCursoDetalle;
    private LocalDateTime fechaModificacionCursoDetalle;

    @PrePersist
    public void onCreate(){
        fechaCreacionCursoDetalle = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionCursoDetalle = LocalDateTime.now();
    }
}
