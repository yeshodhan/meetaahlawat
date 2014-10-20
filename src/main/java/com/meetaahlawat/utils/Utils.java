package com.meetaahlawat.utils;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 7:03 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class Utils {

    public static boolean isEmpty(String s) {
        if(s == null) return true;
        if(s.trim().length() == 0) return true;
        return false;
    }

}
