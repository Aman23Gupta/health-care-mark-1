//import required packages
import { ID, SECRET } from '../../ignore/awskey';
var AWS = require("aws-sdk");

//AWS access details
AWS.config.update({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: "ap-south-1"
});

const faceCheck = (id1, id2, props, aadhar) => {
  const params = {
    SourceImage: {
      S3Object: {
        Bucket: "adhaar",
        Name: id1
      }
    },
    TargetImage: {
      S3Object: {
        Bucket: "adhaar",
        Name: id2
      }
    },
    SimilarityThreshold: 70
  };
  
  //Call AWS Rekognition Class
  const rekognition = new AWS.Rekognition();

  //Detect text
  rekognition.compareFaces(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else { 
      console.log(data);
      if(data.FaceMatches.length!==0) {
        props.navigation.navigate('Report', {adhaar: aadhar})
      }
     } // successful response
  });
};

export default faceCheck;
// end code
