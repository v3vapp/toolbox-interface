# Use a node image as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file to the container
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app
RUN npm run build

# Set the environment to production
ENV NODE_ENV=production

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
