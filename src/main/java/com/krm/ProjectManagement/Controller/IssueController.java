package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.DTO.IssueDTO;
import com.krm.ProjectManagement.Model.Issue;
import com.krm.ProjectManagement.Model.Request.IssueRequest;
import com.krm.ProjectManagement.Model.Response.MessageResponse;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.Impl.IssueServiceImpl;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/issue")
public class IssueController {
    @Autowired
    private IssueServiceImpl issuesService;
    @Autowired
    private UserService userService;


    @GetMapping("/{issueid}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueid) throws Exception {
        return ResponseEntity.ok(issuesService.getIssueById(issueid));
    }

    @GetMapping("/project/{projectid}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectid) throws Exception {
        return ResponseEntity.ok(issuesService.getIssueByProjectId(projectid));
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issueRequest, @RequestHeader("Authorization") String token) throws Exception {
        try {
            User usertoken = userService.findUserProfileByJwt(token);
            User user = userService.findUserById(usertoken.getId());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            Issue createIssue = issuesService.createIssue(issueRequest, user.getId());

            IssueDTO issueDTO = new IssueDTO();
            issueDTO.setId(createIssue.getId());
            issueDTO.setTitle(createIssue.getTitle());
            issueDTO.setDescription(createIssue.getDescription());
            issueDTO.setStatus(createIssue.getStatus());
            issueDTO.setPriority(createIssue.getPriority());
            issueDTO.setAssigne(createIssue.getAsignee());
            issueDTO.setDueDate(createIssue.getDueDate());
            issueDTO.setTags(createIssue.getTags());

            return ResponseEntity.ok(issueDTO);
        } catch (Exception ex) {
            throw new Exception("Error while creating issue: " + ex.getMessage(), ex);
        }
    }

    @DeleteMapping("/{issueid}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueid, @RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfileByJwt(token);
        issuesService.deleteIssue(issueid, user.getId());
        MessageResponse messageResponse = new MessageResponse("Issue Suecsess Fully Deleted");
        return ResponseEntity.ok(messageResponse);

    }

    @PutMapping("/{issueid}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueid, @PathVariable Long userId) throws Exception {
        Issue issue = issuesService.addIssueToUser(issueid, userId);
        return ResponseEntity.ok(issue);

    }

    @PutMapping("/{issueid}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable String status, @PathVariable Long issueid) throws  Exception
    {
        Issue issue= issuesService.updateStatus(issueid,status);
        return  ResponseEntity.ok(issue);
    }

}
