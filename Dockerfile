# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY app/ .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]