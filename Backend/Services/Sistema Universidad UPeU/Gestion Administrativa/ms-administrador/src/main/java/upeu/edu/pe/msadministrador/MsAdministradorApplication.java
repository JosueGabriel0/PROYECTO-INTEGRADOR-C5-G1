package upeu.edu.pe.msadministrador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsAdministradorApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsAdministradorApplication.class, args);
	}

}
