package com.krm.ProjectManagement.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.web.SecurityFilterChain;

@Data
@Entity
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private  User asignee;

}
