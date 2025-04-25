package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Messages;
import com.krm.ProjectManagement.Model.Request.CreateMessageRequest;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.MessageService;
import com.krm.ProjectManagement.Service.ProjectService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Messages> sendMessage(@RequestBody CreateMessageRequest request) throws Exception {
        User user = userService.findUserById(request.getSenderId());
        Chat chat = projectService.getProductById(request.getProjectId()).getChat();
        if (chat == null) {
            throw new Exception("chats not found");
        }

        Messages sendMessage = messageService.sendMessage(request.getSenderId(), request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sendMessage);

    }
    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Messages>> getMessageByChatId(@PathVariable Long projectId) throws  Exception
    {
        List<Messages> messages = messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }

}
