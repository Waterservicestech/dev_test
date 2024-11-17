#TODO Configure o Dockerfile

# Declare image to use
# Node 20 for project dependencies and alpine for performance
FROM node:20-alpine

# Declare work directory inside the container
WORKDIR /app

# Copy package.json file
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Expose port for application
EXPOSE 3000

# Run application
CMD ["npm", "start"]
