package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.Request.IssueRequest;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.IssueRepo;
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
    IssueRepo issueRepo;
    @Autowired
    ProjectService projectService;
    @Autowired
    UserService userService;

    @Override
    public Issue getTokenById(Long issueId) throws Exception {
        Optional<Issue> issue = issueRepo.findById(issueId);

        if (issue.isPresent()) {
            return issue.get();

        }
        throw new Exception("NO issuse found");

    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws Exception {
        return issueRepo.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issue, Long userId) throws Exception {
        Project project = projectService.getProductById(issue.getProjectId());
        Issue issue1 = new Issue();
        issue.setTitle(issue.getTitle());
        issue1.setDescription(issue.getDescription());
        issue1.setStatus(issue.getStatus());
        issue1.setProject(project);
        issue1.setPriority(issue.getPriority());
        issue1.setDueDate(issue.getDueDate());

        return issueRepo.save(issue1);
    }

    @Override
    public void deleteIssue(Long issueId, Long userid) throws Exception {
        getIssueByProjectId(issueId);
        issueRepo.deleteById(issueId);
    }

    @Override
    public Issue addIssueToUser(Long issueid, Long userid) throws Exception {
        User user = userService.findUserById(userid);
        Issue issue = getIssueById(issueid);
        issue.setAsignee(user);

        return issueRepo.save(issue);
    }

    public  Issue getIssueById(Long issueid) {
        Optional<Issue> optionalIssue = issueRepo.findById(issueid);
        try {
            if (optionalIssue.isEmpty()) {
                throw new Exception("issue doesnot exist");
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Issue issue = optionalIssue.get();
        return issue;

    }

    @Override
    public Issue updateStatus(Long issueid, String status) throws Exception {
        Issue issue = getIssueById(issueid);
        issue.setStatus(status);
        return issueRepo.save(issue);

    }
}
