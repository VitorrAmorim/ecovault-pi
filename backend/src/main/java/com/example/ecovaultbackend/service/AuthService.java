package com.example.ecovaultbackend.service;

import com.example.ecovaultbackend.dto.LoginRequestDTO;
import com.example.ecovaultbackend.dto.LoginResponseDTO;
import com.example.ecovaultbackend.dto.RegisterRequestDTO;
import com.example.ecovaultbackend.model.User;
import com.example.ecovaultbackend.repository.UserRepository;
import com.example.ecovaultbackend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado!");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponseDTO(token, user.getName(), user.getPoints(), user.getLevel(), user.getLevelName());
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Senha incorreta!");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponseDTO(token, user.getName(), user.getPoints(), user.getLevel(), user.getLevelName());
    }
}