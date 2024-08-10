# Stage 1: Build the frontend
FROM node:18-alpine as builder

WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN yarn install

# Build the app
RUN yarn build

# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file if you have one
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
