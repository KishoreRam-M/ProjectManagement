package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepo extends JpaRepository<Chat , Long> {
}
