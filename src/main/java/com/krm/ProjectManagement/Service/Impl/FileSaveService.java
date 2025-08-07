package com.krm.ProjectManagement.Service.Impl;

import com.krm.ProjectManagement.Model.File;
import com.krm.ProjectManagement.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.krm.ProjectManagement.Service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;

@Service
public class FileSaveService {
    private static final String BASE_DIR = "/home/codeknightram/ZenFlow-code";

    @Autowired
    UserServiceImpl userService;
    private final FileStorageService fileStorageService;

    public FileSaveService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }


    public String  createFile(File files, User user)
    {



         try{
             String path = fileStorageService.saveToFile(files.getFilename(), files.getContent());
             return  path;


         } catch (Exception e) {
             throw new RuntimeException(e);
         }
    }
}
