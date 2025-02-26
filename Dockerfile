# Stage 1: Base Node image for development and production builds
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies (to be reused in both dev and prod builds)
COPY package*.json ./

# Stage 2: Development Build
FROM base AS development

# Install development dependencies (including dev tools like hot-reloading)
RUN npm install

# Copy the rest of the app source code
COPY . .

# Expose port for development (e.g., React app default 3000)
EXPOSE 3000

# Start the app in development mode (with hot reloading)
CMD ["npm", "run", "dev"]

# Stage 3: Production Build
FROM base AS production

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app source code (excluding dev files)
COPY . .

# Build the production app (optimizing for production)
RUN npm run build

# Serve the production build (use Nginx or any other static file server)
FROM nginx:alpine as final

# Copy built files from production stage to Nginx container
COPY --from=production /app/dist /usr/share/nginx/html

# Expose port 80 for serving the production app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]