package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.Request.IssueRequest;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.IssueRepo;
import com.krm.ProjectManagement.Repo.ProjectRepo;
import com.krm.ProjectManagement.Service.IssuesService;
import com.krm.ProjectManagement.Service.ProjectService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssuesService {

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectRepo projectRepo;

    @Override
    public Issue getIssueById(Long issueId) throws Exception {
        return issueRepo.findById(issueId)
                .orElseThrow(() -> new Exception("Issue not found with ID: " + issueId));
    }

    @Override
    public List<Issue> getIssuesByProjectId(Long projectId) throws Exception {
        return issueRepo.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, Long userId) throws Exception {
        Long id = issueRequest.getProjectId();

        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new Exception("Project not found with ID: " + id));

        Issue newIssue = new Issue();
        newIssue.setTitle(issueRequest.getTitle());
        newIssue.setDescription(issueRequest.getDescription());
        newIssue.setStatus(issueRequest.getStatus());
        newIssue.setPriority(issueRequest.getPriority());
        newIssue.setDueDate(issueRequest.getDueDate());

        newIssue.setProject(project);

        return issueRepo.save(newIssue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        Issue issue = getIssueById(issueId);
        issueRepo.delete(issue);
    }

    @Override
    public Issue assignUserToIssue(Long issueId, Long userId) throws Exception {
        User user = userService.findUserById(userId);
        if (user == null) {
            throw new Exception("User not found with ID: " + userId);
        }

        Issue issue = getIssueById(issueId);
        issue.setAssignee(user);
        return issueRepo.save(issue);
    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);
        return issueRepo.save(issue);
    }
}
