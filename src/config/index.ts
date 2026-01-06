import * as pulumi from '@pulumi/pulumi';

/**
 * Configuration module for platform services.
 * Centralizes all configuration values and constants.
 */

const config = new pulumi.Config();
const stack = pulumi.getStack();

/**
 * Kubernetes configuration
 */
export const kubernetesConfig = {
  // Namespace for platform services
  namespace: config.get('namespace') || 'abernal-platform',
  
  // Common labels for all resources
  commonLabels: {
    'app.kubernetes.io/managed-by': 'pulumi',
    'app.kubernetes.io/part-of': 'abernal-platform',
    'environment': stack,
  },
};

/**
 * Platform services configuration
 */
export const platformConfig = {
  // ArgoCD configuration
  argocd: {
    enabled: config.getBoolean('argocd.enabled') ?? true,
    namespace: config.get('argocd.namespace') || 'argocd',
    version: config.get('argocd.version') || 'latest',
  },
  
  // Verdaccio configuration
  verdaccio: {
    enabled: config.getBoolean('verdaccio.enabled') ?? true,
    namespace: config.get('verdaccio.namespace') || kubernetesConfig.namespace,
    version: config.get('verdaccio.version') || 'latest',
    storage: {
      size: config.get('verdaccio.storage.size') || '10Gi',
      storageClass: config.get('verdaccio.storage.storageClass') || 'local-path',
    },
  },
};

/**
 * Get configuration for current stack
 */
export function getStackConfig() {
  return {
    stack,
    kubernetes: kubernetesConfig,
    platform: platformConfig,
  };
}
