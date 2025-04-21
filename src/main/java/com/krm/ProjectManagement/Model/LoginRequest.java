package com.krm.ProjectManagement.Model;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
