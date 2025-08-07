package com.krm.ProjectManagement.Repo;

import com.krm.ProjectManagement.Model.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepo  extends JpaRepository<File,Long> {
}
