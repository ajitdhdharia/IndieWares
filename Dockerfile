# parent layer
FROM node:21-alpine

# Working directory for the image
WORKDIR /app

# copy application code to /app folder
COPY . .

# install dependencies on the image
RUN npm install

# optional
EXPOSE 5000

# to run our application inside the container
CMD ["node", "index.js"]


