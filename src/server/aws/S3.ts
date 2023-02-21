import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: "AKIAUCGQMLQRJ5XZJP6W",
  secretAccessKey: "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",
  region: "us-east-1",
  signatureVersion: "v4",
});
