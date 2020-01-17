import { ID, SECRET } from '../../ignore/awskey';
const AWS = require("aws-sdk");

import { RNS3 } from "react-native-s3-upload";

const uploadFile=(fileName,id,ind)=>{
    const file = {
    uri:fileName,
    name: `${id}/${id}_${ind}.jpg`,
    type: "image/jpg"
    };

    const options = {
    //keyPrefix: "uploads/",
    bucket: "adhaar",
    region: "ap-south-1",
    accessKey: ID,
    secretKey: SECRET,
    successActionStatus: 201
    };

    RNS3.put(file, options).then(response => {
    if (response.status !== 201) throw new Error("Failed to upload image to S3");
    console.log(response.body);

    });
}
export default uploadFile;