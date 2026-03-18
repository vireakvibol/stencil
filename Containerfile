# Stage 1: Build Angular application
FROM node:24-alpine AS web-build
WORKDIR /app/web
COPY stencil-web/package*.json ./
RUN npm ci && npm cache clean --force
COPY stencil-web/ ./
RUN npx ng build --output-path=dist --configuration production

# Stage 2: Build NestJS application
FROM node:24-alpine AS api-build
WORKDIR /app/api
COPY stencil-api-core/package*.json ./
RUN npm ci && npm cache clean --force
COPY stencil-api-core/ ./
RUN npm run build
# Prune node_modules to production only
RUN npm prune --omit=dev

# Stage 3: Final image (Runtime with Bun)
FROM oven/bun:1.1.3-alpine

# Set to production environment
ENV NODE_ENV=production

WORKDIR /app

# The Bun alpine image uses the 'bun' user instead of 'node'
USER bun

# Copy API build and production node_modules with correct ownership
COPY --chown=bun:bun --from=api-build /app/api/dist ./api/dist
COPY --chown=bun:bun --from=api-build /app/api/node_modules ./api/node_modules
COPY --chown=bun:bun --from=api-build /app/api/package*.json ./api/

# Copy Web build with correct ownership
COPY --chown=bun:bun --from=web-build /app/web/dist/browser ./web/browser

# Expose the port
EXPOSE 3000

# Set the working directory to the API folder to start the app
WORKDIR /app/api
# Run the built NestJS app using Bun
CMD ["bun", "dist/main.js"]
