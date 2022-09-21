import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { basename } from "path";
import { createReadStream, createWriteStream } from "fs";
import { parse } from "csv-parse";
import * as dotenv from 'dotenv'


// const file = "index.xlsx"; // Path to and name of object. For example '../myFiles/index.js'.
// const fileStream = createReadStream(file);
// const downloadPath = 'fds.csv';
// const outputStream = createWriteStream(downloadPath);

dotenv.config()

// Initialize the S3 Client Object to Fetch Dataset and Template
const s3Client = new S3Client({
  endpoint: "https://s3-us-west-1.amazonaws.com",
  region: "us-west-1",
  credentials: {
      // Typically set in environment variables .env file
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

// Set the S3 Bucket and Key to Fetch the Dataset
export const financial_ds_params = {
  // Typically set in environment variables .env file
  Bucket: process.env.S3_BUCKET,
  Key: process.env.DS_FILE_NAME,
};

// Set the S3 Bucket and Key to Fetch the Dataset Template
export const report_pack_templ_params = {
  // Typically set in environment variables .env file
  Bucket: process.env.S3_BUCKET,
  Key: process.env.REPORT_PACK_TEMPLATE,
};

// Function to retrieve the financial_ds
const getFinancialDataset = async () => {
  try {
    const downloadPath = process.env.DS_FILE_NAME;
    const outputStream = createWriteStream(downloadPath);
    const data = await s3Client.send(new GetObjectCommand(financial_ds_params));
    const inputStream = data.Body;
    inputStream.pipe(outputStream);
    outputStream.on('finish', () => {
      console.log(`downloaded the financial_ds successfully`);
    });
  } catch (err) {
    console.log('Error', err);
  }
}

// Function to retrieve the report pack template
const getReportPackTempl = async () => {
  try {
    const downloadPath = process.env.REPORT_PACK_TEMPLATE;
    const outputStream = createWriteStream(downloadPath);
    const data = await s3Client.send(new GetObjectCommand(report_pack_templ_params));
    const inputStream = data.Body;
    inputStream.pipe(outputStream);
    outputStream.on('finish', () => {
      console.log(`downloaded the financial_ds successfully`);
    });
  } catch (err) {
    console.log('Error', err);
  }
}

// Function to convert retrieved dataset file to JS Array
const getFinancialDSArr = async () => {
  return new Promise((res, err) => {
      var ds = [];
      createReadStream(process.env.DS_FILE_NAME)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
              ds.push(row);
          })
          .on("end", function () {
              //console.log(ds[0]);
              res(ds)
          })
          .on("error", (error) => {
              err(console.log(error));
          })
  });
}


// export const uploadParams = {
//   Bucket: "feesynergyds",
//   // Add the required 'Key' parameter using the 'path' module.
//   Key: basename(file),
//   // Add the required 'Body' parameter
//   Body: fileStream,
// };

// const uploadObject = async () => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));
//     console.log("Success", data);
//     return data; // For unit tests.
//   } catch (err) {
//     console.log("Error", err);
//   }
// };

export { s3Client, getFinancialDataset, getFinancialDSArr, getReportPackTempl };
