package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Messages,Long> {

    List<Messages> findByChatIdOrderByCreatedAtAsc(Long id);
}
