package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.Chat;
import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.User;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project , User usere) throws Exception;
    List<Project> getProjectByTeam(User user,String category,String tags) throws  Exception;
    Project getProductById(Long ProjectId) throws Exception;
    void deleteProject(Long ProjectId, Long userid) throws  Exception;
    Project updateProject(Project project ,Long id) throws Exception;
    void addUserIdProject(Long  projectId,Long userid) throws Exception;
    Chat getChatByProjectId(Long projectId) throws Exception;
    List<Project> searchProjects(String keywword ,User user) throws Exception;
    public void removeUserFromProject(Long projectId, Long userId);

}
