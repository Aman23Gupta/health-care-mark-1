import { ID, SECRET } from '../../ignore/awskey';
var AWS = require('aws-sdk');

var s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET, region: 'ap-south-1' });

const getLIST = () => {
    var params = { Bucket: 'adhaar',Delimiter: '' };

    var val = s3.listObjectsV2(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    })
    
    return val;
}

export default getLIST;


