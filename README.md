# Abernal Platform

Platform services configuration for Kubernetes (k3s) using Pulumi and TypeScript.

## Overview

This project manages the deployment of core platform services on Kubernetes (k3s). It uses Pulumi to declaratively configure and deploy services like ArgoCD, Verdaccio, and other foundational platform components.

## Prerequisites

- Node.js >= 22.0.0
- npm
- Pulumi CLI ([Installation Guide](https://www.pulumi.com/docs/get-started/install/))
- Access to a Kubernetes cluster (k3s)
- kubectl configured to access your cluster

## Project Structure

```
abernal-platform/
├── src/
│   ├── config/          # Configuration values and constants
│   ├── resources/       # Resource definitions (services, deployments, etc.)
│   └── index.ts         # Main entry point
├── tests/               # Platform tests
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
├── Pulumi.yaml          # Pulumi project definition
└── Pulumi.dev.yaml      # Dev stack configuration
```

## Services

The platform currently includes:

- **ArgoCD**: GitOps continuous delivery tool for Kubernetes
- **Verdaccio**: Private npm registry for package management

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Pulumi

Login to Pulumi Cloud (free tier):

```bash
pulumi login
```

### 3. Configure Kubernetes Access

Ensure your kubeconfig is properly configured:

```bash
kubectl cluster-info
```

Set the kubeconfig path if needed:

```bash
pulumi config set kubernetes:kubeconfig ~/.kube/config
```

### 4. Deploy Platform Services

Preview changes:

```bash
npm run pulumi:preview
```

Deploy:

```bash
npm run pulumi:up
```

### 5. Destroy Platform Services

```bash
npm run pulumi:destroy
```

## Development

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Format Code

Check formatting:

```bash
npm run format:check
```

Format code:

```bash
npm run format
```

### Run Tests

```bash
npm test
```

## Stack Configuration

### Development (dev)

The development stack is configured in `Pulumi.dev.yaml` and deploys all services to the k3s cluster.

### Staging (staging)

Create a staging stack with:

```bash
pulumi stack init staging
```

Configure staging-specific values in `Pulumi.staging.yaml`.

### Production (prod)

Create a production stack with:

```bash
pulumi stack init prod
```

Configure production-specific values in `Pulumi.prod.yaml`.

## Configuration Values

Key configuration values include:

- `kubernetes:kubeconfig`: Path to kubeconfig file
- `abernal-platform:namespace`: Kubernetes namespace for platform services
- Service-specific configurations (ArgoCD, Verdaccio, etc.)

## License

MIT
