package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Repo.ChatRepo;
import com.krm.ProjectManagement.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImp implements ChatService {
    @Autowired
    ChatRepo repo;
    @Override
    public Chat createChat(Chat chat) {

        return  repo.save(chat);
    }
}
