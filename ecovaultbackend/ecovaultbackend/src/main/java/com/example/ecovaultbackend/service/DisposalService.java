package com.example.ecovaultbackend.service;

import com.example.ecovaultbackend.dto.DisposalRequestDTO;
import com.example.ecovaultbackend.dto.DisposalResponseDTO;
import com.example.ecovaultbackend.model.CollectionPoint;
import com.example.ecovaultbackend.model.Disposal;
import com.example.ecovaultbackend.model.User;
import com.example.ecovaultbackend.repository.CollectionPointRepository;
import com.example.ecovaultbackend.repository.DisposalRepository;
import com.example.ecovaultbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DisposalService {

    private final DisposalRepository disposalRepository;
    private final UserRepository userRepository;
    private final CollectionPointRepository collectionPointRepository;

    public DisposalResponseDTO registerDisposal(String email, DisposalRequestDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        CollectionPoint point = collectionPointRepository.findById(dto.getCollectionPointId())
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado!"));

        int pointsEarned = point.getAcceptedItems().stream()
                .filter(item -> dto.getItems().contains(item.getId()))
                .mapToInt(CollectionPoint.AcceptedItem::getPointsPerDisposal)
                .sum();

        Disposal disposal = new Disposal();
        disposal.setUserId(user.getId());
        disposal.setCollectionPointId(point.getId());
        disposal.setItems(dto.getItems());
        disposal.setPointsEarned(pointsEarned);
        disposal.setCreatedAt(LocalDateTime.now());
        disposalRepository.save(disposal);

        user.setPoints(user.getPoints() + pointsEarned);
        user.setTotalDisposals(user.getTotalDisposals() + 1);

        
        int levelAntes = user.getLevel();
        updateLevel(user);
        boolean levelUp = user.getLevel() > levelAntes;

        userRepository.save(user);

        return new DisposalResponseDTO(
                pointsEarned,
                user.getPoints(),
                user.getLevelProgress(),
                levelUp
        );
    }

    private void updateLevel(User user) {
        int points = user.getPoints();
        if (points >= 5000) {
            user.setLevel(6);
            user.setLevelName("Eco Lendário");
            user.setNextLevelName("Máximo");
            user.setLevelProgress(100);
        } else if (points >= 2000) {
            user.setLevel(5);
            user.setLevelName("Guardião");
            user.setNextLevelName("Eco Lendário");
            user.setLevelProgress((points - 2000) * 100 / 3000);
        } else if (points >= 1000) {
            user.setLevel(4);
            user.setLevelName("Eco-Herói");
            user.setNextLevelName("Guardião");
            user.setLevelProgress((points - 1000) * 100 / 1000);
        } else if (points >= 500) {
            user.setLevel(3);
            user.setLevelName("Reciclador");
            user.setNextLevelName("Eco-Herói");
            user.setLevelProgress((points - 500) * 100 / 500);
        } else if (points >= 100) {
            user.setLevel(2);
            user.setLevelName("Iniciante Verde");
            user.setNextLevelName("Reciclador");
            user.setLevelProgress((points - 100) * 100 / 400);
        } else {
            user.setLevel(1);
            user.setLevelName("Iniciante");
            user.setNextLevelName("Iniciante Verde");
            user.setLevelProgress(points * 100 / 100);
        }
    }
}
