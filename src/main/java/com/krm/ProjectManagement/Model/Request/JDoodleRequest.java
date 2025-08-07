package com.krm.ProjectManagement.Model.Request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JDoodleRequest {
    private String clientId;
    private String clientSecret;
    private String script;
    private String language;
    private String versionIndex;
}
