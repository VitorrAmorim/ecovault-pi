package com.example.ecovaultbackend.controller;

import com.example.ecovaultbackend.model.CollectionPoint;
import com.example.ecovaultbackend.repository.CollectionPointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection-points")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CollectionPointController {

    private final CollectionPointRepository collectionPointRepository;

    @GetMapping
    public ResponseEntity<List<CollectionPoint>> getAll(
            @RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(
                collectionPointRepository.findByNameContainingIgnoreCase(search));
        }
        return ResponseEntity.ok(collectionPointRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionPoint> getById(@PathVariable String id) {
        return collectionPointRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}