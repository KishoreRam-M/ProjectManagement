package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.PlanType;
import com.krm.ProjectManagement.Model.Subcription;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.SubcriptionRepo;
import com.krm.ProjectManagement.Service.SubcriptionService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

public class SubcriptionServiceImpl implements SubcriptionService {
    @Autowired
    private UserService userService;
    @Autowired
    private SubcriptionRepo subcriptionRepo;

    @Override
    public Subcription createSubcription(User user) {
        Subcription subcription = new Subcription();
        subcription.setSubcriptionStartDate(LocalDate.now());
        subcription.setGetSubcriptionEndDate(LocalDate.now().plusMonths(12));
        subcription.setPlanType(PlanType.FREE);

        return subcription;
    }

    @Override
    public Subcription getUsersSubscription(Long userid, PlanType planType) throws Exception {
        return null;
    }

    @Override
    public Subcription upgradeSubcription(Long userid, PlanType planType) {
        return null;
    }

    @Override
    public boolean isValid(Subcription subcription) {
        return false;
    }
}
