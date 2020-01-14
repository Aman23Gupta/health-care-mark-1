//import required packages
var AWS = require("aws-sdk");

//AWS access details
AWS.config.update({
  accessKeyId: "AKIAIG56TNW2D4RWBBEQ",
  secretAccessKey: "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",
  region: "ap-south-1"
});

const faceCheck = (id1, id2) => {
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
  /*const params = {
    SourceImage: {
     S3Object: {
      Bucket: "adhaar", 
      Name: "cat.jpg"
     },
    },
    TargetImage: {
        S3Object: {
         Bucket: "adhaar", 
         Name: "cat.jpg"
        },
       },
    SimilarityThreshold: 70
   };
   */

  //Call AWS Rekognition Class
  const rekognition = new AWS.Rekognition();

  //Detect text
  rekognition.compareFaces(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

export default faceCheck;
// end code
