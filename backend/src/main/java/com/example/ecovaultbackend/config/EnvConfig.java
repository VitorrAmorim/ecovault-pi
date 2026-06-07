package com.example.ecovaultbackend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import java.nio.file.Paths;

@Configuration
public class EnvConfig {
    static {
        try {
            String projectDir = Paths.get("").toAbsolutePath().toString();
            String backendDir = projectDir.endsWith("backend") ? projectDir
                    : Paths.get(projectDir, "backend").toString();

            Dotenv dotenv = Dotenv.configure()
                    .directory(backendDir)
                    .filename(".env")
                    .ignoreIfMissing()
                    .load();

            dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        } catch (Exception e) {
            System.err.println("Warning: Could not load .env file: " + e.getMessage());
        }
    }
}
