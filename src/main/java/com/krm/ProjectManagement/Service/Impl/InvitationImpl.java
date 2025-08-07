package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Invitation;
import com.krm.ProjectManagement.Repo.InvitationRepo;
import com.krm.ProjectManagement.Service.EmailService;
import com.krm.ProjectManagement.Service.InvitationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationImpl  implements InvitationService {
    @Autowired
    private EmailService emailService;
    @Autowired
    private InvitationRepo repo;
    @Override
    public void sendInvintation(String email, Long projectid) throws MessagingException {
        String token = UUID.randomUUID().toString();
        Invitation invitation= new Invitation();
        invitation.setEmail(email);
        invitation.setToken(token);
        invitation.setProjectID(projectid);
        repo.save(invitation);
        String invitationLink ="http://localhost:5173/accept_invitation?token="+token;
        emailService.sendEmailWithToken(email,invitationLink);

    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) throws Exception {
        Invitation invitation= repo.findByToken(token);
        if(invitation==null)
        {
            throw  new Exception("Invalid Invitation Token");
        }
        return invitation;
    }

    @Override
    public String getTokemByUserMail(String email) {
        Invitation invitation = repo.findByEmail(
                email
        );

        return invitation.getToken();
    }

    @Override
    public void deleteToken(String token) {
        Invitation invitation=repo.findByToken(token);
        repo.delete(invitation);

    }
}
