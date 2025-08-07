package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.PlanType;
import com.krm.ProjectManagement.Model.Subcription;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.SubcriptionRepo;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subcription")
public class SubcriptionController {
    @Autowired
    private UserService userService;
    @Autowired
    private SubcriptionRepo subcriptionRepo;

    public ResponseEntity<Subcription> getUserSubcription(@RequestHeader("Authorization") String jwt, @RequestParam PlanType planType

    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Subcription subcription = subcriptionRepo.findByUserId(user.getId());
        return ResponseEntity.ok(subcription);


    }
}
