package com.krm.ProjectManagement.Controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {
    private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;
    @PostMapping("/ask")
    public ResponseEntity<String> askGemini(@RequestBody Map<String, String> body) {
        String userPrompt = body.get("prompt");

        // Create the request payload
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> message = Map.of("parts", List.of(Map.of("text", userPrompt)));
        requestBody.put("contents", List.of(message));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_URL, requestEntity, String.class);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
