package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.Subcription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubcriptionRepo extends JpaRepository<Subcription,Long> {
    Subcription findByUserId(Long userid);
}
