# Use Node.js LTS image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose the port your backend runs on
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
