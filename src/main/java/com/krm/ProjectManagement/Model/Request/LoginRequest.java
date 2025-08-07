package com.krm.ProjectManagement.Model.Request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
