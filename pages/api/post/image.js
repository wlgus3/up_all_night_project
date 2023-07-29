import aws from "aws-sdk";

export default async function handler(요청, 응답) {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    region: "ap-northeast-2",
    // signatureVersion: "v4",
  });

  const s3 = new aws.S3({});
  // presigned url 생성
  const url = await s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Fields: { key: 요청.query.file },
    Expires: 60, // url exp seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });
  console.log(url);
  응답.status(200).json(url);
}
