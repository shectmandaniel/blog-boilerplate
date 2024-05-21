# Specify a base image
FROM node:14-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/app

# Install a dependency
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]