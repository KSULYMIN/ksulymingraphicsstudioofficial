# Security Policy

## Supported versions

The default branch is the supported source line. Security-related dependency changes should be reviewed and production deployments rebuilt from a lockfile that resolves patched package versions.

## Reporting a vulnerability

Please do not publish exploit code, private customer information, payment proof, credentials, or environment-variable values in a public issue. If GitHub private vulnerability reporting is enabled for this repository, use it. Otherwise, contact the repository owner privately through GitHub and include the affected route/package, impact, and a minimal reproducible description.

## Operational guidance

- Keep GitHub Actions permissions scoped to the job that needs them.
- Do not place API keys, payment credentials, or other secrets in client-prefixed environment variables.
- After a security dependency update, verify the resolved lockfile versions, production build, type check, and deployed version.
- Test payment changes in a provider sandbox before enabling production transactions.
