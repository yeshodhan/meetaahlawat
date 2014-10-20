package com.meetaahlawat.pojos;

import org.json.JSONObject;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 11:24 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class Photo {

    String title;
    String url;
    String thumbnail;
    int width;
    int height;

    public Photo() {
    }

    public Photo(String title, String url, String thumbnail, int width, int height) {
        this.title = title;
        this.url = url;
        this.thumbnail = thumbnail;
        this.width = width;
        this.height = height;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public JSONObject toJSON() {
        JSONObject j_photo = new JSONObject();
        j_photo.put("title", title);
        j_photo.put("url", url);
        j_photo.put("thumbnail", thumbnail);
        j_photo.put("width", width);
        j_photo.put("height", height);
        return j_photo;
    }
}
