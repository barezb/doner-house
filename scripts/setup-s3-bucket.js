const { S3Client, PutBucketCorsCommand, PutBucketPolicyCommand, PutPublicAccessBlockCommand } = require('@aws-sdk/client-s3');

// Load environment variables
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'doner-house';

async function setupS3Bucket() {
  console.log('Setting up S3 bucket:', BUCKET_NAME);

  try {
    // 1. Configure CORS
    console.log('Setting CORS configuration...');
    const corsConfiguration = {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          AllowedOrigins: ['*'], // In production, replace with your domain
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3000,
        },
      ],
    };

    await s3Client.send(
      new PutBucketCorsCommand({
        Bucket: BUCKET_NAME,
        CORSConfiguration: corsConfiguration,
      })
    );
    console.log('✅ CORS configuration set successfully');

    // 2. Set public access block settings to allow public read
    console.log('Configuring public access settings...');
    await s3Client.send(
      new PutPublicAccessBlockCommand({
        Bucket: BUCKET_NAME,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: false,
          IgnorePublicAcls: false,
          BlockPublicPolicy: false,
          RestrictPublicBuckets: false,
        },
      })
    );
    console.log('✅ Public access settings configured');

    // 3. Set bucket policy for public read access to menu-items folder
    console.log('Setting bucket policy...');
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/menu-items/*`],
        },
      ],
    };

    await s3Client.send(
      new PutBucketPolicyCommand({
        Bucket: BUCKET_NAME,
        Policy: JSON.stringify(bucketPolicy),
      })
    );
    console.log('✅ Bucket policy set successfully');

    console.log('\n🎉 S3 bucket setup completed successfully!');
    console.log(`Your images in the menu-items/ folder will be publicly accessible.`);
    console.log(`Example URL: https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/menu-items/your-image.jpg`);

  } catch (error) {
    console.error('❌ Error setting up S3 bucket:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure your AWS credentials have the necessary permissions');
    console.error('2. Verify the bucket name is correct');
    console.error('3. Check if the bucket exists in the specified region');
  }
}

setupS3Bucket();