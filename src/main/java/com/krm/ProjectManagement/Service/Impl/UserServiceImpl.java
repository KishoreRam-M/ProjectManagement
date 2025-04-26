package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Configuration.JwtProvider;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Repo.UserRepo;
import com.krm.ProjectManagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo repo;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = repo.findByEmail(email);
        if (user == null) {
            throw new Exception("user not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> optionalUser = repo.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new Exception(
                    "user not found"
            );
        }
        return  optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()-number);
        return repo.save(user);
    }
}
