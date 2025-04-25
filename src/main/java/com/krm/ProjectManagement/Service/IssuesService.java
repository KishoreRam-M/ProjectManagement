package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Request.IssueRequest;

import java.util.List;
import java.util.Optional;

public interface IssuesService {

    Issue getTokenById(Long issueId) throws Exception;
    List<Issue> getIssueByProjectId(Long projectId )throws Exception;
    Issue createIssue(IssueRequest issue, Long userId)throws Exception;
   // Optional<Issue> updateIssue(Long issueid,IssueRequest updateIssue,Long Userid)throws Exception;
    void deleteIssue(Long issueId , Long userid)throws Exception;
//    List<Issue>getIssueByAssignedId(Long assignedid)throws Exception;
//    List<Issue>searchIssue(String title,String status,String priority,Long assignedId)throws Exception;
//    List<Issue>getIssuesByAssignedById(Long assignedid)throws Exception;
//    List<User>getAssignedForIssue(Long issueid) throws Exception;
    Issue addIssueToUser(Long issueid, Long userid)throws Exception;
    Issue updateStatus(Long issueid,String status)throws Exception;






}
