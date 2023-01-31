package br.com.adoteme;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Adoteme - API", version = "0.0.1-SNAPSHOT", description = "Open API 3.0 Projeto Adoteme"))
public class AdotemeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdotemeApplication.class, args);
	}

}
