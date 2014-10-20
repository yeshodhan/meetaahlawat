import com.meetaahlawat.utils.FileOrganizer;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 7:34 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class CopyFiles {

    public static void main(String[] args) throws Exception {


        String largePath = "/Users/yeshodhan/Documents/meeta/images/large";
        String thumbnailPath = "/Users/yeshodhan/Documents/meeta/images/thumbnails";
        String targetDir = "/tmp/pics_river";
        String prefix = "river";

        FileOrganizer organizer = new FileOrganizer();
        organizer.copyOptimizedFiles(prefix, largePath, thumbnailPath, targetDir);


    }

}
