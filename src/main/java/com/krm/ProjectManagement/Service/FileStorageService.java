package com.krm.ProjectManagement.Service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;

@Service
public class FileStorageService {

    private static final String BASE_DIR = "/home/codeknightram/ZenFlow-code";

    public String saveToFile(String fullFileName, String content) throws IOException {
        // Ensure directory exists
        Path dirPath = Paths.get(BASE_DIR);
        if (!Files.exists(dirPath)) {
            Files.createDirectories(dirPath);
        }

        Path filePath = dirPath.resolve(fullFileName);

        Files.writeString(filePath, content, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

        return filePath.toAbsolutePath().toString();
    }
}
