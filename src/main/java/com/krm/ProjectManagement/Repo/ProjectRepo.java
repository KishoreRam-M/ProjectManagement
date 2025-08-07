package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Project;
import com.krm.ProjectManagement.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {

    List<Project> findByOwner(User user);

    @Query("SELECT p FROM Project p JOIN p.team t WHERE p.description LIKE %:partialName% AND t = :user")
    List<Project> findByNameAndTeamMember(@Param("partialName") String partialName, @Param("user") User user);

    @Query("SELECT p FROM Project p JOIN p.team t WHERE t = :user")
    List<Project> findProjectByTeam(@Param("user") User user);

    List<Project> findByTeamContainingOrOwner(User user, User owner);
    List<Project> findByNameContainingAndTeamContains(String partialname,User user);
}
