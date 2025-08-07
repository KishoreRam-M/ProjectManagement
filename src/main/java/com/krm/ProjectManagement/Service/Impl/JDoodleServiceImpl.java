package com.krm.ProjectManagement.Service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krm.ProjectManagement.Model.Request.JDoodleRequest;
import com.krm.ProjectManagement.Service.JDoodleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class JDoodleServiceImpl implements JDoodleService {

    private String clientId ="776e70df545f345945552cf5eaecce54";

    private String clientSecret="294e8f31c15a4dcd298e190f56d1f8a314bf5b66e35f0dc2ff38a91029e03e9";

    private static final String JDoodle_URL = "https://api.jdoodle.com/v1/execute";

    @Override
    public String compileCode(String code, String language, String versionIndex) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        JDoodleRequest request = JDoodleRequest.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .script(code)
                .language(language)
                .versionIndex(versionIndex)
                .build();

        Map<String, Object> requestBody = mapper.convertValue(request, Map.class);

        Map<String, Object> response = restTemplate.postForObject(JDoodle_URL, requestBody, Map.class);
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response);
    }
}
