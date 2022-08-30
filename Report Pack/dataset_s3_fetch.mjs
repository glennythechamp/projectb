import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {path} from "path";
import {fs} from "fs";

const file = "index.xlsx"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = fs.createReadStream(file);



const s3Client = new S3Client({
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "sgp1",
    credentials: {
        // Typically set in environment variables, dummy/test s3 bucket credentials used.
        accessKeyId: "DO00HGUUXVFGKVRBFUAB",
        secretAccessKey: "qC0ptC6hxJpLmo5r+zWsUk6z6uDreItZK5bXZdoxj7w"
    }
});

export const uploadParams = {
  Bucket: "BUCKET_NAME",
  // Add the required 'Key' parameter using the 'path' module.
  Key: path.basename(file),
  // Add the required 'Body' parameter
  Body: fileStream,
};



const uploadObject = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
  



export { s3Client, s3params, uploadObject };
