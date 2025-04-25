package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long issueId , Long userId,String comment) throws Exception;
    void deleteComment(Long commentId,Long userId) throws Exception;
    List<Comment> findCommentByIssueId(Long issueid);
}
