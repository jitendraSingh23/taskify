# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy Prisma files for migration
COPY prisma ./prisma

# Expose the Next.js dev server port
EXPOSE 3000

# Start the Next.js dev server with hot-reloading
CMD ["npm", "run", "dev"]