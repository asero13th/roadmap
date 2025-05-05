# Use a base Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# ✅ Add wait-for-it script to image
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 3000

# Start the app (can be overridden in docker-compose)
CMD ["npm", "start"]
