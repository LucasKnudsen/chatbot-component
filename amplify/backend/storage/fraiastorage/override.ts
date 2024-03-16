import { AmplifyS3ResourceTemplate } from '@aws-amplify/cli-extensibility-helper'

export function override(resources: AmplifyS3ResourceTemplate) {
  resources.s3AuthPublicPolicy.policyDocument.Statement = [
    ...resources.s3AuthPublicPolicy.policyDocument.Statement,
    {
      Effect: 'Allow',
      Action: ['s3:PutObject', 's3:PutObjectAcl'],
      Resource: `arn:aws:s3:::${resources.s3Bucket.bucketName}/_/*`,
    },
  ]
}
