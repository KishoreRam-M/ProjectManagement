package com.krm.ProjectManagement.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonIgnore
    @ManyToOne
    private User asignee;
    @ManyToOne
    private Project project;
    private String status;
    private String priority;
    private LocalDate dueDate;
    private String title;
    private String description;
    @ElementCollection

    private List<String> tags = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();


}
