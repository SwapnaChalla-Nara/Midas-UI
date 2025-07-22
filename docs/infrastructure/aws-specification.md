# Infrastructure Specification for MiDAS Front-End

## Overview

This document specifies the cloud infrastructure required for deploying and hosting the MiDAS Front-End application.

## Architecture

The MiDAS Front-End follows a modern static site architecture using:
- **Build Tool**: Vite for optimized static asset generation
- **Hosting**: Amazon S3 for static file storage
- **CDN**: Amazon CloudFront for global content delivery
- **CI/CD**: GitHub Actions for automated deployment

## AWS Infrastructure Components

### 1. S3 Buckets

#### Production Bucket
- **Name**: `midas-ui-production`
- **Region**: `us-east-1` (recommended for CloudFront integration)
- **Configuration**:
  - Static website hosting enabled
  - Public read access for website content
  - Versioning enabled for rollback capability
  - Lifecycle policies for cost optimization

#### Staging Bucket
- **Name**: `midas-ui-staging`
- **Region**: `us-east-1`
- **Configuration**: Same as production

### 2. CloudFront Distributions

#### Production Distribution
- **Origin**: S3 production bucket
- **Caching**: Optimized for static assets
- **Compression**: Gzip enabled
- **Security**: HTTPS only, custom SSL certificate
- **Error Pages**: Custom 404 handling for SPA routing

#### Staging Distribution
- **Origin**: S3 staging bucket
- **Configuration**: Same as production

### 3. IAM Roles and Policies

#### GitHub Actions Deployment Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::midas-ui-production/*",
        "arn:aws:s3:::midas-ui-staging/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

## Required Environment Variables

The following secrets must be configured in GitHub repository settings:

- `AWS_ACCESS_KEY_ID`: AWS access key for deployment
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for deployment
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `S3_PRODUCTION_BUCKET`: Production S3 bucket name
- `S3_STAGING_BUCKET`: Staging S3 bucket name
- `CLOUDFRONT_PRODUCTION_DISTRIBUTION_ID`: Production CloudFront distribution ID
- `CLOUDFRONT_STAGING_DISTRIBUTION_ID`: Staging CloudFront distribution ID

## Cost Estimation

### Monthly Costs (estimated)
- **S3 Storage**: $1-5/month (depending on usage)
- **CloudFront**: $1-10/month (depending on traffic)
- **Data Transfer**: Variable based on usage
- **Total**: $5-20/month for low to medium traffic

## Security Considerations

1. **S3 Bucket Policies**: Restrict access to necessary operations only
2. **CloudFront**: HTTPS only, security headers
3. **IAM**: Least privilege access for deployment roles
4. **Secrets Management**: Use GitHub Secrets for sensitive data

## Monitoring and Alerts

Recommended CloudWatch metrics to monitor:
- S3 bucket size and request metrics
- CloudFront hit ratio and error rates
- Deployment success/failure rates
- Application performance metrics

## Disaster Recovery

- **Backup**: S3 versioning provides point-in-time recovery
- **Rollback**: Previous builds can be redeployed from CI/CD history
- **Cross-region**: Consider cross-region replication for critical applications