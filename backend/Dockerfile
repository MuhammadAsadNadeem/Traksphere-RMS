# Base image
FROM node:20.18.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if required, e.g., TypeScript)
# RUN npm run build

# Expose the application port (replace 3000 with your actual application port)
EXPOSE 5000

# Specify the command to run your application
CMD ["npm", "run", "dev"]
