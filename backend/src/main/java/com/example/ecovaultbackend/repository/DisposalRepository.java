package com.example.ecovaultbackend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ecovaultbackend.model.Disposal;

public interface DisposalRepository extends MongoRepository<Disposal, String>{
    List<Disposal> findByUserId(String userId);
}
