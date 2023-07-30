import aws from "aws-sdk";

export default async function handler(req, res) {
  //aws 설정
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    region: "ap-northeast-2",
    // signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  //! 1차시도 코드 -> 실패
  // presigned url 생성
  // const url = await s3.createPresignedPost({
  //   Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  //   Fields: { key: req.query.file ,'Content-Type': 'image/jpeg',},
  //   Conditions: [
  //     ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
  //   ],
  //   Expires: 60, // url exp seconds
  // });
  // console.log(url);
  // res.status(200).json(url);

  //! 2차시도 코드 -> 성공
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Fields: { key: req.query.file, "Content-Type": "image/jpeg" },
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
    Expires: 60, // url exp seconds
  };

  try {
    // Pre-Signed POST 생성
    const presignedPostData = s3.createPresignedPost(params);

    // 클라이언트에게 전달할 데이터를 응답으로 보냅니다.
    res.status(200).json(presignedPostData);
  } catch (error) {
    // 오류가 발생한 경우 오류를 응답으로 보냅니다.
    res.status(500).json({ error: "Failed to generate pre-signed POST URL" });
  }
}
