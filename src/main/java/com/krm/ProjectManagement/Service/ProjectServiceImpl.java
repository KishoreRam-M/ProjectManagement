package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.ProjectRepo;
import com.krm.ProjectManagement.Repo.UserRepo;
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
    public Project createProject(Project project, User usere) throws Exception {
        Project createdProject = new Project();
        createdProject.setCategory(project.getCategory());
        createdProject.setOwner(usere);
        createdProject.setDescription(project.getDescription());
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.getTeam().add(usere);

        Project savedProject = projectRepo.save(createdProject);
        Chat chat = new Chat();

        chat.setProject(savedProject);
        Chat projectChat = serviceImp.createChat(chat);
        savedProject.setChat(chat);

        return savedProject;
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tags) throws Exception {
        List<Project> projects = projectRepo.findByTeamContainingOrOwner(user, user);
        if (category != null) {
            projects = projects.stream().filter(project -> project.getCategory().equals(category)).collect(Collectors.toList());
        }

        if (tags != null) {
            projects = projects.stream().filter(project -> project.getTags().equals(tags)).collect(Collectors.toList());
        }
        return projects;

    }

    @Override
    public Project getProductById(Long ProjectId) throws Exception {
        Optional<Project> projectOptional = projectRepo.findById(ProjectId);
        if (projectOptional.isEmpty()) {
            throw new Exception("User does not exist");
        }

        Project project = projectOptional.get();
        return project;
    }

    @Override
    public void deleteProject(Long ProjectId, Long userid) throws Exception {
        projectRepo.deleteById(ProjectId);


    }

    @Override
    public Project updateProject(Project project, Long id) throws Exception {
        Project upadtedProject = new Project();
        upadtedProject.setName(upadtedProject.getName());
        upadtedProject.setDescription(upadtedProject.getDescription());
        upadtedProject.setTags(upadtedProject.getTags());
        return projectRepo.save(upadtedProject);
    }

    @Override
    public void addUserIdProject(Long projectId, Long userid) throws Exception {
        Project project = getProductById(projectId);
        User user = userService.findUserById(userid);
        if(!project.getTeam().contains(user))
        {
            project.getChat().getUserList().add(user);
            project.getTeam().add(user);
            projectRepo.save(project);
        }


    }

    @Override
    public void removeUserIdProject(Long projectId, Long userId) throws Exception {

        Project project = getProductById(projectId);
        User user = userService.findUserById(userId);
        if(!project.getTeam().contains(user))
        {
            project.getChat().getUserList().remove(user);
            project.getTeam().remove(user);
            projectRepo.save(project);
        }

    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
        Project project =getProductById(projectId);

        return project.getChat();
    }

    @Override
    public List<Project> searchProjects(String keywword, User user) throws Exception {
        return projectRepo.findByNameContainingAndTeamContains(keywword, user);

    }
}
