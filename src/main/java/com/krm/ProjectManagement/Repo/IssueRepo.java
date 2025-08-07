package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Issue;
import org.antlr.v4.runtime.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepo extends JpaRepository<Issue, Long> {
    public List<Issue> findByProjectId(Long projectid);

}
