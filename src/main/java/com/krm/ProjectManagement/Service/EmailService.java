package com.krm.ProjectManagement.Service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String email,String token) throws MessagingException;
}
