# Base stage
FROM node:20 as base

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci

# Test stage
FROM base as test

ENV NODE_ENV test

RUN npm run test

# Build stage
FROM base as build-stage
# force build-stage use the test stage
COPY --from=test /usr/src/app/package.json /dev/null

ENV VITE_BACKEND_URL="http://localhost:8080/api/"

RUN npm run build

# Nginx stage
FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

