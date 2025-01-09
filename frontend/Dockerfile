# Use an official Node.js image as the base image
FROM node:20.18.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the default port used by Vite
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
