package com.example.ecovaultbackend.dto;

import java.util.List;

import lombok.Data;

@Data
public class DisposalRequestDTO {
    private String collectionPointId;
    private List<String> items;
}
