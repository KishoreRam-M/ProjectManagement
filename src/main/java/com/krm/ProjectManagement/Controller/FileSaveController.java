package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.File;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.FileStorageService;
import com.krm.ProjectManagement.Service.Impl.FileSaveService;
import com.krm.ProjectManagement.Service.Impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;



@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileSaveController {
    private static final String BASE_DIR = "/home/codeknightram/ZenFlow-code";


    private final FileStorageService fileStorageService;
    @Autowired
    FileSaveService saveService;
    @Autowired
    UserServiceImpl userService;

    @PostMapping("/save")
    public String saveCustomFile(@RequestBody File file, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        String path = saveService.createFile(file,user);

        return  path;

    }



}
