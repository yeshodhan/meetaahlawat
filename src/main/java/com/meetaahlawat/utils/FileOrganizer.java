package com.meetaahlawat.utils;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.util.Collection;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 6:57 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class FileOrganizer {

    public void copyOptimizedFiles(String prefix, String largeImageDirPath, String thumbnailDirPath, String targetDirPath) throws Exception {
        File largeImageDir = new File(largeImageDirPath);
        File thumbnailDir = new File(thumbnailDirPath);

        File targetDir = new File(targetDirPath);
        FileUtils.forceMkdir(targetDir);
        File targetThumbnailDir = new File(targetDirPath + "/thumbnails");
        FileUtils.forceMkdir(targetThumbnailDir);

        Collection<File> largeFiles = FileUtils.listFiles(largeImageDir, new String[]{"jpg"}, false);


        if(largeFiles != null) {
            int index = 1;
            for(File large : largeFiles) {

                File thumb = new File(thumbnailDir + "/" + large.getName());

                String fileName = prefix + "_" + (index++) + "." + FilenameUtils.getExtension(large.getName());

                File largeNew = new File(targetDirPath + "/" + fileName);
                File thumbNew = new File(targetDirPath + "/thumbnails/" + fileName);

                FileUtils.copyFile(large, largeNew);
                if(thumb != null) FileUtils.copyFile(thumb, thumbNew);

            }
        }

    }

}
