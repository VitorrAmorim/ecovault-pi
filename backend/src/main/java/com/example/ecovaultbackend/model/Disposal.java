package com.example.ecovaultbackend.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "disposals")
public class Disposal {
    

    @Id
    private String id;

    private String userId;
    private String collectionPointId;
    private List<String> items;
    private int pointsEarned;
    private LocalDateTime createdAt;
}
