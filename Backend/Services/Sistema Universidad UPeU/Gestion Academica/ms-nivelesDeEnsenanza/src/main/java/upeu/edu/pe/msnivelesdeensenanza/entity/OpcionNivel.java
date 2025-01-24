package upeu.edu.pe.msnivelesdeensenanza.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import upeu.edu.pe.msnivelesdeensenanza.dto.Carrera;
import upeu.edu.pe.msnivelesdeensenanza.dto.PlanificacionAcademica;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "opcion_nivel")
@Data
public class OpcionNivel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOpcionNivel;

    @ManyToOne
    @JoinColumn(name = "nivel_id")
    @JsonBackReference
    private NivelEnsenanza nivelEnsenanza;

    private String tipoEstudio;
    private String semestre;
    private String campus;

    private Long idPLanificacionAcademica;
    @Transient
    private PlanificacionAcademica planificacionAcademica;

    private Long idCarrera;
    @Transient
    private Carrera carrera;

    private String modalidad;
    private String estado;

    @OneToMany(mappedBy = "opcionNivel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CicloDetalle> cicloDetalle;

    private double costoDeMatricula;
    private double costoPorCredito;

    private boolean consentimientoInformado;

    private LocalDateTime fechaCreacionOpcionNivel;
    private LocalDateTime fechaModificacionOpcionNivel;

    @PrePersist
    public void onCreate(){
        fechaCreacionOpcionNivel = java.time.LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate(){
        fechaModificacionOpcionNivel = java.time.LocalDateTime.now();
    }

    // Getters y setters
}