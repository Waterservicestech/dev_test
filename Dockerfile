# Use a base image for Node.js
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]