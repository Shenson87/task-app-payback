# Use arm64 explicitly
FROM node:20-alpine

WORKDIR /app

# Copy only package.json & lock file first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
