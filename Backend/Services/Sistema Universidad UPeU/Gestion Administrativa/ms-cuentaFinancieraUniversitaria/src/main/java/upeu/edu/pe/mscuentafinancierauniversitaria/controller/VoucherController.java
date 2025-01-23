package upeu.edu.pe.mscuentafinancierauniversitaria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import upeu.edu.pe.mscuentafinancierauniversitaria.entity.Voucher;
import upeu.edu.pe.mscuentafinancierauniversitaria.service.VoucherService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping("/images/{nombreImagen}")
    public ResponseEntity<FileSystemResource> getImagen(@PathVariable String nombreImagen) {
        String directorioImagenes = "src/main/resources/static/images";
        File imagen = new File(directorioImagenes, nombreImagen);

        if(imagen.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imagen.getName() + "\"")
                    .body(new FileSystemResource(imagen));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Voucher> guardarVoucherResponseEntity(@ModelAttribute Voucher voucher, @RequestParam("file") MultipartFile voucherURL) {
        if(!voucherURL.isEmpty()) {
            Path directorioImagenes = Paths.get("src//main//resources//static/images");
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
            try {
                byte[] bytesImg = voucherURL.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + voucherURL.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

                voucher.setVoucherURL(voucherURL.getOriginalFilename());
            }catch (IOException e){
                e.printStackTrace();
            }
        }

        System.out.println("Este es el voucher que se esta guardando mediante el controller y el service: "+voucher);
        Voucher nuevoVoucher = voucherService.crear(voucher);

        return ResponseEntity.ok(nuevoVoucher);
    }

    @GetMapping
    public ResponseEntity<List<Voucher>> listarVouchers() {
        return ResponseEntity.ok(voucherService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voucher> listarVouchePorId(@PathVariable Long id) {
        return ResponseEntity.ok(voucherService.obtenerPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrarVoucher(@PathVariable Long id) {
        voucherService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/porCuentaFinanciera/{idCuentaFinanciera}")
    public ResponseEntity<List<Voucher>> obtenerPorCuentaFinanciera(@PathVariable Long idCuentaFinanciera) {
        return ResponseEntity.ok(voucherService.obtenerPorCuentaFinanciera(idCuentaFinanciera));
    }

    @GetMapping("/buscar/{idCuentaFinanciera}/{anio}")
    public ResponseEntity<List<Voucher>> buscarPorCuentaYAnio(
            @PathVariable Long idCuentaFinanciera,
            @PathVariable int anio) {
        return ResponseEntity.ok(voucherService.buscarPorCuentaYAnio(idCuentaFinanciera, anio));
    }

    @PostMapping(value = "/cuenta/{idCuentaFinanciera}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Voucher> guardarVoucherParaCuentaFinanciera(
            @PathVariable Long idCuentaFinanciera,
            @ModelAttribute Voucher voucher,
            @RequestParam("file") MultipartFile voucherURL
    ) {
        if (!voucherURL.isEmpty()) {
            // Define el directorio donde se guardarán las imágenes
            Path directorioImagenes = Paths.get("src//main//resources//static/images");
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

            try {
                // Guardar el archivo en la ruta especificada
                byte[] bytesImg = voucherURL.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + voucherURL.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

                // Establecer la URL del archivo en el voucher
                voucher.setVoucherURL(voucherURL.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        }

        // Asociar el voucher con la cuenta financiera y guardar
        Voucher nuevoVoucher = voucherService.crearVoucherParaCuentaFinanciera(idCuentaFinanciera, voucher);

        return ResponseEntity.ok(nuevoVoucher);
    }

    @PutMapping(value = "cuenta/voucher/{idVoucher}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Voucher> actualizarVoucher(@PathVariable(required = true) Long idVoucher, @ModelAttribute Voucher datosVoucherActualizados, @RequestParam("file") MultipartFile voucherURL) {
        if(!voucherURL.isEmpty()) {
            Path directorioImagenes = Paths.get("src//main//resources//static/images");
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
            try {
                byte[] bytesImg = voucherURL.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + voucherURL.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);

                datosVoucherActualizados.setVoucherURL(voucherURL.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        }

        System.out.println("Este es el voucher que se esta actualizando mediante el controller y el service: "+ datosVoucherActualizados);
        Voucher voucherActualizado = voucherService.actualizarVoucherDeCuentaFinanciera(idVoucher, datosVoucherActualizados);
        return ResponseEntity.ok(voucherActualizado);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Voucher>> buscarPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(voucherService.buscarPorEstado(estado));
    }

    @PutMapping("/actualizarEstado/{idVoucher}/{estado}")
    public ResponseEntity<Voucher> actualizarEstado(@PathVariable Long idVoucher, @PathVariable String estado) {
        return ResponseEntity.ok(voucherService.actualizarEstadoVoucher(idVoucher, estado));
    }
}
