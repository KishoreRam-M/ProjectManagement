package com.krm.ProjectManagement.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data

public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long  id;
   private   String filename;
    private String content;
}
