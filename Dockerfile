# Use the official Node.js image as the base image
FROM node:16.8.0

# Set the working directory inside the container

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY prisma ./  

ENV DATABASE_URL process.env.DATABASE_URL

ENV SECRET process.env.SECRET

ENV API_KEY process.env.API_KEY

RUN npx prisma generate

RUN npx prisma migrate dev

WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy the frontend application code
COPY frontend ./

# Build the frontend application
RUN npm run build

# Expose the port your Next.js application will run on
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
