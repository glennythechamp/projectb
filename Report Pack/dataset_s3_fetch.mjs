import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { basename } from "path";
import { createReadStream, createWriteStream } from "fs";

const file = "index.xlsx"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = createReadStream(file);
const downloadPath = 'fds.csv';
const outputStream = createWriteStream(downloadPath);

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
  Bucket: "feesynergyds",
  // Add the required 'Key' parameter using the 'path' module.
  Key: basename(file),
  // Add the required 'Body' parameter
  Body: fileStream,
};

export const financial_ds_params = {
  Bucket: "feesynergyds",
  Key: "fInancial_database.csv",
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
  
const getFinancialDataset = async () => {
  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;
    inputStream.pipe(outputStream);
    outputStream.on('finish', () => {
      console.log(`downloaded the file successfully`);
    });
  } catch (err) {
    console.log('Error', err);
  }
}


export { s3Client, uploadObject, getFinancialDataset };
