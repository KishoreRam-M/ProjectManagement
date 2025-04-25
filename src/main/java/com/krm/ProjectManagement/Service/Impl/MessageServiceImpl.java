package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Messages;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.MessageRepo;
import com.krm.ProjectManagement.Repo.UserRepo;
import com.krm.ProjectManagement.Service.MessageService;
import com.krm.ProjectManagement.Service.ProjectService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    UserService userService;
    @Autowired
    ProjectService projectService;
    @Autowired
    UserRepo userRepo;
    @Autowired
    MessageRepo messageRepo;


    @Override
    public Messages sendMessage(Long senderId, Long projectId, String content) throws Exception {
        User sender = userRepo.findById(senderId).orElseThrow(() -> new Exception("User not found with id" + senderId));
        Chat chat=projectService.getProductById(projectId).getChat();
        Messages messages=   new Messages();
        messages.setChat(chat);
        messages.setSender(sender);
        messages.setCreatedAt(LocalDateTime.now());
        messages.setContent(content);
        Messages savedMessage=messageRepo.save(messages);
        chat.getMessages().add(messages);
        return savedMessage;
    }

    @Override
    public List<Messages> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat=projectService.getChatByProjectId(projectId);
        List<Messages>findByChatIdOrderByCreatedAtAsc=messageRepo.  findByChatIdOrderByCreatedAtAsc(chat.getId());
        return  findByChatIdOrderByCreatedAtAsc;
    }
}
