package com.krm.ProjectManagement.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommandRequest {
    private  Long issueId;
    private  String content;
}
