FROM node:18.18.0-alpine

COPY ["package.json", "yarn.lock", ".nvmrc","tsconfig.build.json","tsconfig.json","src", "./"]
RUN ls
RUN yarn install
RUN yarn build
RUN yarn prisma:gen
RUN yarn migrate:latest


RUN yarn install --production
WORKDIR /dist

EXPOSE 3000

CMD ["node", "main.js", "--enable-source-maps"]
