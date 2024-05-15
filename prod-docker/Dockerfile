FROM node:18.18.0-alpine

COPY ./ ./app
WORKDIR /app
RUN yarn
RUN yarn prisma generate --schema=./src/infrastructure/prisma/schema.prisma
# RUN yarn migrate:deploy



