# Use an Node.js runtime as base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install angular cli
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy source code from to
COPY . .

# Build the Angular app
RUN ng build -- --production

# Use lightweight web server
FROM nginx:alpine

# Copy app from the build stage to the nginx dir
COPY --from=build /usr/src/app/dist/yield /usr/share/nginx/html

# Expose Http port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


