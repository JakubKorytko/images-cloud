import { ExpectedData } from "../../models/expectedData.model";
import {sampleImage, expectedData, rmIfExists, getpath, mkdirIfNotExists} from "../../testsData";
require('dotenv').config();
const getPhotos = require("../../../src/utils/photos.util");
const fs = require("fs");

test("Get images data from /src/images/{username} folder", () => {

    const username = "_test_photos_util_get"

    const dest = getpath(username, "photos", "sample.png")

    expect(fs.existsSync(sampleImage)).toBe(true);

    //image sample.png must be included in /src/images/_test_sample/sample.png
    //in case image is missing - https://filesamples.com/samples/image/png/sample_640×426.png
    //if the link is dead and file is missing add new sample image 
    //and change expected data in /test/testsData
    //(you can get image data by getPhotos util)

    mkdirIfNotExists(getpath(username));
    mkdirIfNotExists(getpath(username, "photos"));
    
    rmIfExists(dest);

    fs.copyFileSync(sampleImage, dest);

    const data = getPhotos(username);
    
    const objectExists = data.length===1;

    //if the test fail - there is probably more files in /src/images/_test_sample/photos folder
    //or the sample image is missing - check comments above

    expect(objectExists).toBe(true);

    const imageData = data[0];

    const properties = Object.keys(expectedData).map(key=>{
        return (expectedData[key as keyof ExpectedData] == imageData[key])
    })
    
    const propertiesMatch = !properties.includes(false);

    //if data don't match there is high probabilty that:
    //1. expected data is wrong
    //2. there is wrong image in /src/images/_test_sample/sample.png dest

    expect(propertiesMatch).toBe(true)

    rmIfExists(getpath(username))

    //folder deleting shouldn't go wrong, checking just in case
    
    expect(fs.existsSync(getpath(username))).toBe(false);
})