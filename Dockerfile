# Use the official Node.js image as the base image
FROM node:16.8.0

# Set the working directory inside the container

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY prisma ./

ENV DATABASE_URL "postgresql://postgres:postgres123@ec2-3-145-63-125.us-east-2.compute.amazonaws.com:5432/TakeNoteDB"

ENV SECRET "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDU1MTI0NCwiaWF0IjoxNjg0NTUxMjQ0fQ.b-aEVDpSIFdrBTLU1XuBIzh3qsxjh4mUqYjmoyf-Dw4="

ENV API_KEY "bb7fe589-e182-4815-96ed-c9b984c8d377"

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
