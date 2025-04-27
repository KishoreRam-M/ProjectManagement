package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.Comment;
import com.krm.ProjectManagement.Model.Request.CreateCommandRequest;
import com.krm.ProjectManagement.Model.Response.MessageResponse;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.CommentService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/comment")
@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommandRequest createCommandRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Comment comment = commentService.createComment(createCommandRequest.getIssueId(), user.getId(), createCommandRequest.getContent());
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/{commentid}")
    public ResponseEntity<MessageResponse> deleteContent(@PathVariable Long comment, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(comment, user.getId());
        MessageResponse messageResponse = new MessageResponse("Comment:" + comment + "is deleted by  user:" + user.getId());
        return ResponseEntity.ok(messageResponse);
    }

    @GetMapping("/all/issueId/{issueId}")
    public ResponseEntity<List<Comment>> getCommentByIssueId(@PathVariable Long issueId) {
        List<Comment> comments = commentService.findCommentByIssueId(issueId);
        return ResponseEntity.ok(comments);
    }

}
