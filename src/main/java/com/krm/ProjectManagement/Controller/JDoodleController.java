package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Service.Impl.JDoodleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller to receive code from frontend, send to JDoodle API,
 * and return the output back to frontend.
 */
@RestController
@RequestMapping("/api/jdoodle")
public class JDoodleController {

    @Autowired
    private JDoodleService jdoodleService;

    /**
     * Endpoint to compile and run Java code using JDoodle API.
     *
     * @param request A JSON object with the key "code"
     * @return Output from JDoodle
     */
    @PostMapping("/compile")
    public ResponseEntity<String> compileCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");

        if (code == null || code.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Code is missing.");
        }

        try {
            String output = jdoodleService.compileJavaCode(code);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("🚨 Something went wrong: " + e.getMessage());
        }
    }
}
