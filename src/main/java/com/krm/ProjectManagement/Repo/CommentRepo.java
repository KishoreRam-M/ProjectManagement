package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment,Long> {
    List<Comment> findCommentByIssueId(Long issueid);
}
