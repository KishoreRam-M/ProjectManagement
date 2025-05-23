package com.krm.ProjectManagement.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueRequest {
    private String status;
    private String priority;
    private LocalDate dueDate;
    private String title;
    private String description;
    private Long projectId;
}
