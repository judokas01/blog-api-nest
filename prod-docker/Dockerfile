FROM node:18.18.0-alpine

COPY ./src ./app/src
COPY [ "package.json", "yarn.lock", "tsconfig.json","tsconfig.build.json", "./app/" ]
WORKDIR /app
RUN yarn
RUN yarn prisma generate --schema=./src/infrastructure/prisma/schema.prisma



