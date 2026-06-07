package com.example.ecovaultbackend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "collection_points")
public class CollectionPoint {
    
    @Id
    private String id;

    private String name;
    private String address;
    private double lat;
    private double lng;
    private boolean isOpen;
    private String openStatus;
    private String status; // "green", "amber", "blue"

    private List<AcceptedItem> acceptedItems;

    @Data
    public static class AcceptedItem {
        @Field("id")
        private String id;
        private String label;
        private int pointsPerDisposal;
    }

}
