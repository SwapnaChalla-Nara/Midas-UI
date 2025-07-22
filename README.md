# MiDAS UI

AI-driven Development Platform - Frontend Application

## Quick Start

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
npm run test
```

### Linting
```bash
npm run lint
```

## Project Structure

```
├── src/                 # Source code
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   └── test/           # Test setup
├── public/             # Static assets
├── docs/               # Documentation
│   └── infrastructure/ # Infrastructure specs
├── .github/            # GitHub Actions workflows
└── dist/               # Build output (generated)
```

## Deployment

The application is automatically deployed using GitHub Actions:

- **Staging**: Deployed from `develop` branch to staging environment
- **Production**: Deployed from `main` branch to production environment

For detailed deployment information, see [Deployment Specification](docs/infrastructure/deployment-specification.md).

## Infrastructure

The application is hosted on AWS using:
- **S3**: Static file hosting
- **CloudFront**: CDN for global distribution
- **GitHub Actions**: CI/CD pipeline

For detailed infrastructure information, see [AWS Specification](docs/infrastructure/aws-specification.md).

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests and linting
4. Create a pull request to `develop`
5. After review and merge, changes will be deployed to staging
6. Create a pull request from `develop` to `main` for production deployment

## Architecture

This is a modern React application built with:
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Vitest**: Testing framework
- **ESLint**: Code linting

## License

This project is proprietary and confidential.
