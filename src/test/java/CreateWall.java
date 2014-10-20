import com.meetaahlawat.utils.WallCreator;
import org.json.JSONObject;

import java.io.IOException;

/**
 * User: Yeshodhan Kulkarni
 * Date: 10/20/14
 * Time: 11:31 AM
 * Copyright (c) 2013-2014 Ensuant Inc. All Rights Reserved.
 * Confidential and proprietary information of Ensuant Inc.
 */
public class CreateWall {

    public static void main(String[] args) throws IOException {
        WallCreator wallCreator = new WallCreator();
        JSONObject j_wall = wallCreator.create();
        System.out.print(j_wall.toString(3));
    }

}
