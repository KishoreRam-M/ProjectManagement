package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.PlanType;
import com.krm.ProjectManagement.Model.Subcription;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.SubcriptionRepo;
import com.krm.ProjectManagement.Service.SubcriptionService;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
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

        Subcription subcription = subcriptionRepo.findByUserId(userid);
        if (isValid(subcription)) {
            subcription.setPlanType(PlanType.FREE);
            subcription.setGetSubcriptionEndDate(LocalDate.now().plusMonths(12));
            subcription.setSubcriptionStartDate(LocalDate.now());
        }
        return subcriptionRepo.save(subcription);

    }

    @Override
    public Subcription upgradeSubcription(Long userId, PlanType planType) {
        Subcription subcription = subcriptionRepo.findByUserId(userId);
        subcription.setPlanType(planType);
        subcription.setSubcriptionStartDate(LocalDate.now());

        if (planType.equals(PlanType.ANNUALLY)) {
            subcription.setGetSubcriptionEndDate(LocalDate.now().plusMonths(12));
        } else {
            subcription.setGetSubcriptionEndDate(LocalDate.now().plusMonths(1));
        }

        return subcriptionRepo.save(subcription);
    }

    @Override
    public boolean isValid(Subcription subcription) {
        if (subcription.getPlanType().equals(PlanType.FREE)) {
            return true;
        }
        LocalDate endDate = subcription.getGetSubcriptionEndDate();
        LocalDate currentDate = LocalDate.now();
        return endDate.isAfter(currentDate) || endDate.isEqual(currentDate);
    }
}
