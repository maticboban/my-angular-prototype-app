# Build stage
FROM node:24.7.0-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist/my-angular-prototype-app /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
