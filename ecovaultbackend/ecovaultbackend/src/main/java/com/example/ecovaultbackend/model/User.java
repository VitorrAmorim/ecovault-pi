package com.example.ecovaultbackend.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {


    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;

    private int points = 0;
    private int level = 1;
    private String levelName = "Iniciante";
    private String nextLevelName = "Eco-Herói";
    private int levelProgress = 0;
    private int streak = 0;
    private int totalDisposals = 0;
    private String rank = "";

    private List<String> unlockedBadgeIds = new ArrayList<>();
    
}
