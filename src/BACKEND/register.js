//const fs = require('fs');
const AWS = require('aws-sdk');
const ID = 'AKIAIG56TNW2D4RWBBEQ';
const SECRET = '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';
var a = '7225819972';
// The name of the bucket that you have created
BUCKET_NAME = a;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
const uploadFile = (fileName,id,ind) => {
    // Read content from the file
    //const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'adhaar',
        Key: `${id}/${id}_${ind}.jpg`, // File name you want to save as in S3
        Body: fileName
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

export default uploadFile;