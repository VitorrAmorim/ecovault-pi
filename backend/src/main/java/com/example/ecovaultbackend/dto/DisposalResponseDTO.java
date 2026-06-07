package com.example.ecovaultbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DisposalResponseDTO {
    private int pointsEarned;
    private int newTotal;
    private int levelProgress;
    private boolean levelUp;
}
