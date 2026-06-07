package com.example.ecovaultbackend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private String id;
    private String name;
    private int points;
    private int level;
    private String levelName;
    private String nextLevelName;
    private int levelProgress;
    private int streak;
    private int totalDisposals;
    private String rank;
    private List<String> unlockedBadgeIds;
}
