package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Service.JDoodleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/jdoodle")
@RequiredArgsConstructor
public class JDoodleController {

    private final JDoodleService jdoodleService;

    @PostMapping("/compile")
    public ResponseEntity<String> compileCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String language = request.getOrDefault("language", "java");
        String versionIndex = request.getOrDefault("versionIndex", "4");

        if (code == null || code.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Code is missing.");
        }

        try {
            String output = jdoodleService.compileCode(code, language, versionIndex);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("🚨 Error while compiling: " + e.getMessage());
        }
    }
}
