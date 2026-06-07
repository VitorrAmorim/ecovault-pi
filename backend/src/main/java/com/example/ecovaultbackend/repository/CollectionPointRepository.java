package com.example.ecovaultbackend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ecovaultbackend.model.CollectionPoint;

    public interface CollectionPointRepository extends MongoRepository<CollectionPoint, String> {
    List<CollectionPoint> findByNameContainingIgnoreCase(String name);
}
