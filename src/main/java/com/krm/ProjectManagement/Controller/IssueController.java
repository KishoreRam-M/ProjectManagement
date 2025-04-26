package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.DTO.IssueDTO;
import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.Request.IssueRequest;
import com.krm.ProjectManagement.Model.Response.MessageResponse;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.Impl.IssueServiceImpl;
import com.krm.ProjectManagement.Service.ProjectService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue")
public class IssueController {

    @Autowired
    private IssueServiceImpl issueService;

    @Autowired
    private UserService userService;
    @Autowired
    private ProjectService projectService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws Exception {
        Issue issue = issueService.getIssueById(issueId);
        return ResponseEntity.ok(issue);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssuesByProjectId(@PathVariable Long projectId) throws Exception {
        List<Issue> issues = issueService.getIssuesByProjectId(projectId);
        return ResponseEntity.ok(issues);
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issueRequest, @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfileByJwt(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Issue createdIssue = issueService.createIssue(issueRequest, user.getId());
        Project project= projectService.getProductById(issueRequest.getProjectId());


        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setId(createdIssue.getId());
        issueDTO.setTitle(createdIssue.getTitle());
        issueDTO.setDescription(createdIssue.getDescription());
        issueDTO.setStatus(createdIssue.getStatus());
        issueDTO.setPriority(createdIssue.getPriority());
        issueDTO.setAssignee(createdIssue.getAssignee());
        issueDTO.setDueDate(createdIssue.getDueDate());
        issueDTO.setTags(project.getTags());
        issueDTO.setProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId, @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId, user.getId());
        return ResponseEntity.ok(new MessageResponse("Issue successfully deleted."));
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> assignUserToIssue(@PathVariable Long issueId, @PathVariable Long userId) throws Exception {
        Issue updatedIssue = issueService.assignUserToIssue(issueId, userId);
        return ResponseEntity.ok(updatedIssue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable Long issueId, @PathVariable String status) throws Exception {
        Issue updatedIssue = issueService.updateStatus(issueId, status);
        return ResponseEntity.ok(updatedIssue);
    }
}
