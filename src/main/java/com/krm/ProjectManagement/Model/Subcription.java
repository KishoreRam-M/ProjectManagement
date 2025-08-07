package com.krm.ProjectManagement.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Subcription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate subcriptionStartDate;
    private LocalDate getSubcriptionEndDate;
    private PlanType planType;
    private boolean isValid;
    @OneToOne
    private User user;
}
