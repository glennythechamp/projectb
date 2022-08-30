import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


const s3Client = new S3Client({
    endpoint: "https://sgp1.digitaloceanspaces.com",
    region: "sgp1",
    credentials: {
        // Typically set in environment variables, dummy/test s3 bucket credentials used.
        accessKeyId: "DO00HGUUXVFGKVRBFUAB",
        secretAccessKey: "qC0ptC6hxJpLmo5r+zWsUk6z6uDreItZK5bXZdoxj7w"
    }
});

const s3params = {
    Bucket: "feesynergyds",
    Key: "index.xlsx",
    ACL: "private",
    Metadata: {
        "type": "test_dataset"
    } 
};


const uploadObject = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log(
        "Successfully uploaded object: " +
          params.Bucket +
          "/" +
          params.Key
      );
      return data;
    } catch (err) {
      console.log("Error", err);
    }
};
  



export { s3Client, s3params, uploadObject };
