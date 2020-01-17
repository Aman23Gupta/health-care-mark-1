import { ID, SECRET } from '../../ignore/awskey';
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET, region: 'ap-south-1' });

const getURL = (key) => {
    var params = { Bucket: 'adhaar', Key: key };
    
    var url=s3.getSignedUrl('getObject', params);
    return  url;
}

export default getURL;