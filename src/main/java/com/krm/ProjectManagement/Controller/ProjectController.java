package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Invitation;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.Response.MessageResponse;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.Impl.ProjectServiceImpl;
import com.krm.ProjectManagement.Service.InvitationService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectServiceImpl projectService;
    @Autowired
    private InvitationService invitationService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.getProjectByTeam(user, category, tag);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        userService.findUserProfileByJwt(jwt);
        Project project = projectService.getProductById(projectId);

        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project createdProject = projectService.createProject(project, user);

        return ResponseEntity.ok(createdProject);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project,
            @PathVariable Long projectId
    ) throws Exception {
        userService.findUserProfileByJwt(jwt);
        Project updatedProject = projectService.updateProject(project, projectId);
        return ResponseEntity.ok(updatedProject);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) String keyword
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> searchedProjects = projectService.searchProjects(keyword, user);
        return ResponseEntity.ok(searchedProjects);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long projectId
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId, user.getId());
        return ResponseEntity.ok("Project deleted successfully");
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long projectId
    ) throws Exception {
        userService.findUserProfileByJwt(jwt);
        Chat chat = projectService.getChatByProjectId(projectId);
        return ResponseEntity.ok(chat);
    }

    @PostMapping("/accept_invitation")
    public ResponseEntity<Invitation> inviteProject(
            @RequestBody Invitation invitation,
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        MessageResponse messageResponse = new MessageResponse("User Invitation send");
        projectService.addUserIdProject(invitation.getProjectID(), user.getId());

        Invitation invitation1 = invitationService.acceptInvitation(invitation.getEmail(), invitation.getProjectID());
        return ResponseEntity.ok(invitation1);
    }


}
