# Stencil: Angular + NestJS Fullstack Application

A modern, high-performance monorepo featuring an Angular frontend and a NestJS backend, optimized for efficiency with a Node.js build pipeline and a Bun runtime.

## 🚀 Tech Stack

- **Frontend**: [Angular](https://angular.io/) (v21+)
- **Backend**: [NestJS](https://nestjs.com/) (v11+)
- **Runtime**: [Bun](https://bun.sh/) (v1.1.3-alpine) - for high-performance production serving.
- **Build Engine**: [Node.js](https://nodejs.org/) (v24) - for stable and reliable building.
- **CI/CD**: GitHub Actions with [GHCR](https://github.com/features/packages).

## 📁 Project Structure

```text
.
├── .github/workflows/   # CI/CD Workflows
├── stencil-api-core/    # NestJS Backend API
├── stencil-web/         # Angular Frontend Web
└── Dockerfile           # Multi-stage Hybrid Docker Build
```

## 🛠️ Docker Deployment Strategy

This project uses a **Hybrid Build Approach** to ensure maximum stability and runtime performance:
1. **Build Stages**: Uses **Node.js 24** to build both Angular and NestJS apps for guaranteed compatibility with existing toolchains.
2. **Runtime Stage**: Uses **Bun 1.1.3-alpine** to serve the application, resulting in faster cold starts and significantly lower memory footprint compared to traditional Node.js runtimes.

### Local Docker Build
```bash
docker build -t stencil-app .
docker run -p 3000:3000 stencil-app
```

## 🔄 CI/CD & Versioning

The project is configured with an advanced GitHub Action workflow that automatically builds and pushes images to the **GitHub Container Registry (GHCR)**.

### Docker Tagging Logic
| Event | Docker Tag |
| :--- | :--- |
| **Stable Tag** (`1.0.0`) | `latest` (Highest Version), `1.0.0`, `{sha}` |
| **Pre-release** (`1.0.0-beta`) | `1.0.0-beta`, `{sha}` |
| **Push to Main** | `branch-main`, `{sha}` |
| **Pull Request** | `pull-request-{number}`, `{sha}` |

### Automated Releases
- **Stable Releases**: Pushing a tag like `1.x.x` creates an official GitHub Release with auto-generated changelogs.
- **Pre-releases**: Tags with hyphens (e.g., `1.x.x-beta`) are automatically marked as "Pre-release" on GitHub and do **not** overwrite the `:latest` Docker tag.

## 💻 Local Development

### API (NestJS)
```bash
cd stencil-api-core
npm install
npm run start:dev
```

### Web (Angular)
```bash
cd stencil-web
npm install
npm run start
```

## ⚖️ License
[GNU Affero General Public License v3.0](LICENSE.md)
