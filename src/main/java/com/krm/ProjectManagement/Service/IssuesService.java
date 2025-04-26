package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Request.IssueRequest;

import java.util.List;

public interface IssuesService {

    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssuesByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issueRequest, Long userId) throws Exception;

    void deleteIssue(Long issueId, Long userId) throws Exception;

    Issue assignUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String status) throws Exception;
}
