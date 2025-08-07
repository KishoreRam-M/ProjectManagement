package com.krm.ProjectManagement.Service.Impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Map;

@Service
public class AiServiceImpl {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public AiServiceImpl(WebClient webClient) {
        this.webClient = webClient;
        this.objectMapper = new ObjectMapper();
    }

    public String getAnswer(String question) {
        try {
            Map<String, Object> payload = Map.of(
                    "contents", new Object[] {
                            Map.of("parts", new Object[] {
                                    Map.of("text", question)
                            })
                    }
            );

            // Make the API call
            String response = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey) // Correct URL format
                    .header("Content-Type", "application/json")
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Parse and extract the actual answer from Gemini response
            return extractAnswerFromResponse(response);

        } catch (WebClientResponseException e) {
            System.err.println("API Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return "Error: Unable to get response from AI service";
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return "Error: An unexpected error occurred";
        }
    }

    private String extractAnswerFromResponse(String response) {
        try {
            JsonNode jsonNode = objectMapper.readTree(response);

            // Navigate through Gemini API response structure
            JsonNode candidates = jsonNode.get("candidates");
            if (candidates != null && candidates.isArray() && candidates.size() > 0) {
                JsonNode content = candidates.get(0).get("content");
                if (content != null) {
                    JsonNode parts = content.get("parts");
                    if (parts != null && parts.isArray() && parts.size() > 0) {
                        JsonNode text = parts.get(0).get("text");
                        if (text != null) {
                            return text.asText();
                        }
                    }
                }
            }

            // If parsing fails, return the raw response
            return response;

        } catch (Exception e) {
            System.err.println("Error parsing response: " + e.getMessage());
            return response; // Return raw response if parsing fails
        }
    }
}