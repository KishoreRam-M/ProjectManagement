package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Service.Impl.AiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ask")
public class AiController {

    @Autowired
    private AiServiceImpl aiService;

    @PostMapping("/qna")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Received payload: " + payload);

            // Extract question from the request body
            String question = (String) payload.get("question");

            if (question == null || question.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Question is required");
            }

            System.out.println("Question: " + question);

            String answer = aiService.getAnswer(question);
            System.out.println("Answer: " + answer);

            return ResponseEntity.ok(answer);

        } catch (Exception e) {
            System.err.println("Error processing request: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Error processing your request");
        }
    }
}
