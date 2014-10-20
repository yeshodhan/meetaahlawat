package com.meetaahlawat.utils;

import com.meetaahlawat.pojos.Photo;
import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 11:17 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class WallCreator {

    public List<String> wall_directories;

    public static final String ROOT_PATH = "/Users/yeshodhan/Work/projects/meetaahlawat.com/src/main/webapp";

    public WallCreator(){
        wall_directories = new ArrayList<>();
        wall_directories.add("pics_amu");
        wall_directories.add("pics_camppl");
        wall_directories.add("pics_fatdat");
        wall_directories.add("pics_ne2014");
        wall_directories.add("pics_niyamgiri");
        wall_directories.add("pics_river");
    }

    public JSONObject create() throws IOException {
        JSONObject j_wall = new JSONObject();
        List<Photo> wallPhotos = new ArrayList<>();
        for(String path : wall_directories) {
            Collection<File> files = FileUtils.listFiles(new File(ROOT_PATH + "/" + path), new String[]{"jpg"}, false);
            for(File f : files) {
                String url = "/" + path + "/" + f.getName();
                String thumbnail = "/" + path + "/thumbnails/" + f.getName();
                BufferedImage readImage = ImageIO.read(f);
                int h = readImage.getHeight();
                int w = readImage.getWidth();
                wallPhotos.add(new Photo(null, url, thumbnail, w, h));
            }
        }
        Collections.shuffle(wallPhotos);
        JSONArray j_photos = new JSONArray();
        j_wall.put("media", j_photos);
        for(Photo photo : wallPhotos) {
            j_photos.put(photo.toJSON());
        }
        return j_wall;
    }

}
