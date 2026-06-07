package com.example.ecovaultbackend.controller;

import com.example.ecovaultbackend.dto.DisposalRequestDTO;
import com.example.ecovaultbackend.dto.DisposalResponseDTO;
import com.example.ecovaultbackend.service.DisposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/disposals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DisposalController {

    private final DisposalService disposalService;

    @PostMapping
    public ResponseEntity<DisposalResponseDTO> registerDisposal(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody DisposalRequestDTO dto) {
        return ResponseEntity.ok(
            disposalService.registerDisposal(userDetails.getUsername(), dto));
    }
}
