package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Messages;

import java.util.List;

public interface MessageService {
    Messages sendMessage(Long senderId,Long projectId,String content) throws Exception;
    List<Messages> getMessageByProjectId(Long projectId) throws Exception;
}
