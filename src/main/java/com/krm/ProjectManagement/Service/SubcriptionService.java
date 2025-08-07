package com.krm.ProjectManagement.Service;

import com.krm.ProjectManagement.Model.PlanType;
import com.krm.ProjectManagement.Model.Subcription;
import com.krm.ProjectManagement.Model.User;

public interface SubcriptionService {
    Subcription createSubcription(User user);
    Subcription getUsersSubscription(Long userid, PlanType planType)throws Exception;
    Subcription upgradeSubcription(Long userid,PlanType planType);
    boolean isValid(Subcription subcription);
}

