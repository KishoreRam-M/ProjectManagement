package com.krm.ProjectManagement.Service.Impl;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

/**
 * This class helps us connect with JDoodle API to compile and run Java code online.
 * JDoodle is like an online compiler. We send code, and it gives us output.
 */
@Service
public class JDoodleService {

    // JDoodle API endpoint URL
    private static final String API_URL = "https://api.jdoodle.com/v1/execute";

    // These credentials you'll get when you create free account in JDoodle website.
    // You must replace these with your actual client ID and secret.
    private static final String CLIENT_ID = "776e70df545f345945552cf5eaecce54"; // 👉 Replace this
    private static final String CLIENT_SECRET = "294e8f31c15a4dcd298e190f56d1f8a314bf5b66e35f0dc2ff38a91029e03e9";

    /**
     * This method takes Java code as input, sends it to JDoodle,
     * and gets the output back.
     *
     * @param javaCode The Java code to compile and run
     * @return Output from JDoodle API (like terminal result)
     */
    public String compileJavaCode(String javaCode) {

        // We are using RestTemplate to call external API
        RestTemplate restTemplate = new RestTemplate();

        // Body of the request to send to JDoodle
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("clientId", CLIENT_ID); // 👈 from JDoodle account
        requestBody.put("clientSecret", CLIENT_SECRET); // 👈 from JDoodle account
        requestBody.put("script", javaCode); // 👈 your actual Java code
        requestBody.put("language", "java"); // 👈 language
        requestBody.put("versionIndex", "4"); // 👈 version index (JDoodle uses this for compiler version)

        // Set headers to say we're sending JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Combine headers and body into one request
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Send POST request to JDoodle API
        ResponseEntity<String> response = restTemplate.exchange(
                API_URL, // where to send
                HttpMethod.POST, // method type
                entity, // request body + headers
                String.class // expecting string as response
        );

        // Return whatever JDoodle responds back (usually stdout or error)
        return response.getBody();
    }
}
