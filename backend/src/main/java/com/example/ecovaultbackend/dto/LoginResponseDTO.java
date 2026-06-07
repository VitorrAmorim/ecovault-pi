package com.example.ecovaultbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    
    private String token;
    private String name;
    private int points;
    private int level;
    private String levelName;
}
