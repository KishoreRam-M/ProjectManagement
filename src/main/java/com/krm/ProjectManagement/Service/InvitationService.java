package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {
    public void sendInvintation(String email,Long projectid) throws MessagingException;
    public Invitation  acceptInvitation(String token,Long userId) throws Exception;
    public String getTokemByUserMail(String email);
    void deleteToken(String token);
}


