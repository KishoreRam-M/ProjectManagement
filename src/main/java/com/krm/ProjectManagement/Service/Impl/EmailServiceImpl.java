package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public void sendEmailWithToken(String email, String token) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String subject = " Project Invitation ";
        String text = "Click Below link to Join  the Team";
        helper.setSubject(subject);
        helper.setTo(email);
        helper.setText(text);
        try {
            javaMailSender.send(mimeMessage);

        } catch (Exception e) {
            throw new MailSendException("Failed to send email");
        }


    }
}
