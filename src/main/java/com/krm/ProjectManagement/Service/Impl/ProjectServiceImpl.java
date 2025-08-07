package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.ProjectRepo;
import com.krm.ProjectManagement.Repo.UserRepo;
import com.krm.ProjectManagement.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private ChatServiceImp serviceImp;
    @Autowired
    private UserRepo userRepo;

    @Override
    public Project createProject(Project project, User user) throws Exception {
        Project createdProject = new Project();
        createdProject.setCategory(project.getCategory());
        createdProject.setOwner(user);
        createdProject.setDescription(project.getDescription());
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.getTeam().add(user);

        Project savedProject = projectRepo.save(createdProject);
        Chat chat = new Chat();

        chat.setProject(savedProject);
        Chat projectChat = serviceImp.createChat(chat);
        savedProject.setChat(projectChat);

        return savedProject;
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tags) throws Exception {
        List<Project> projects = projectRepo.findByTeamContainingOrOwner(user, user);
        if (category != null) {
            projects = projects.stream().filter(project -> project.getCategory().equals(category)).collect(Collectors.toList());
        }

        if (tags != null) {
            projects = projects.stream()
                    .filter(project -> project.getTags().contains(tags))
                    .collect(Collectors.toList());
        }
        return projects;
    }

    @Override
    public Project getProductById(Long projectId) throws Exception {
        Optional<Project> projectOptional = projectRepo.findById(projectId);
        if (projectOptional.isEmpty()) {
            throw new Exception("Project does not exist");
        }

        return projectOptional.get();
    }

    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {
        projectRepo.deleteById(projectId);
    }

    @Override
    public Project updateProject(Project project, Long id) throws Exception {
        Project updatedProject = getProductById(id);

        updatedProject.setName(project.getName());
        updatedProject.setDescription(project.getDescription());
        updatedProject.setTags(project.getTags());

        return projectRepo.save(updatedProject);
    }

    @Override
    public void addUserIdProject(Long projectId, Long userId) throws Exception {
        Project project = getProductById(projectId);
        User user = userService.findUserById(userId);
        if (!project.getTeam().contains(user)) {
            project.getChat().getUserList().add(user);
            project.getTeam().add(user);
            projectRepo.save(project);
        }
    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (project.getTeam().contains(user)) {
            if (project.getChat() != null) {
                project.getChat().getUserList().remove(user);
            }
            project.getTeam().remove(user);
            projectRepo.save(project);
        } else {
            throw new RuntimeException("User not part of project team");
        }
    }


    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
        Project project = getProductById(projectId);
        return project.getChat();
    }

    @Override
    public List<Project> searchProjects(String keyword, User user) throws Exception {
        return projectRepo.findByNameContainingAndTeamContains(keyword, user);
    }
}
