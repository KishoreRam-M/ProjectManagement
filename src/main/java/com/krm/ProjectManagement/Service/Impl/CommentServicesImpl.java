package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Comment;
import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.CommentRepo;
import com.krm.ProjectManagement.Repo.IssueRepo;
import com.krm.ProjectManagement.Repo.UserRepo;
import com.krm.ProjectManagement.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServicesImpl implements CommentService {
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public Comment createComment(Long issueId, Long userId, String comment) throws Exception {
        Optional<Issue> issueOptional = issueRepo.findById(issueId);

        Optional<User> userOptional = userRepo.findById(userId);
        if (issueOptional.isEmpty()) {
            throw new Exception("issue is not found with id :" + issueId);
        }
        if (userOptional.isEmpty()) {
            throw new Exception("user not found with id :" + userId);
        }
        User user = userOptional.get();

        Issue issue = issueOptional.get();
        Comment comment1 = new Comment();
        comment1.setContent(comment);
        comment1.setUser(user);
        comment1.setIssue(issue);
        comment1.setLocalDateTime(LocalDateTime.now());
        Comment savedComment = commentRepo.save(comment1);
        issue.getComments().add(savedComment);
        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> commentOptional = commentRepo.findById(commentId);
        Optional<User> userOptional = userRepo.findById(userId);
        if (commentOptional.isEmpty()) {
            throw new Exception("comment not find with id :" + commentId);
        }
        if (userOptional.isEmpty()) {
            throw new Exception("user not found with id " + userId);
        }
        Comment comment = commentOptional.get();
        User user = userOptional.get();
        if (comment.getUser().getId().equals(user.getId())) {
            commentRepo.deleteById(commentId);
        } else {
            throw new Exception(" unknow person try to  delete the comment");
        }

    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueid) {
        return commentRepo.findCommentByIssueId(issueid);
    }
}
