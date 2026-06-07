package com.example.ecovaultbackend.service;

import com.example.ecovaultbackend.dto.UserResponseDTO;
import com.example.ecovaultbackend.model.User;
import com.example.ecovaultbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDTO getUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getPoints(),
                user.getLevel(),
                user.getLevelName(),
                user.getNextLevelName(),
                user.getLevelProgress(),
                user.getStreak(),
                user.getTotalDisposals(),
                user.getRank(),
                user.getUnlockedBadgeIds()
        );
    }
}
