
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app
COPY --from=builder /app/dist ./dist

RUN npm install -g http-server
COPY .env ./

EXPOSE 8081

CMD ["http-server", "./dist", "-p", "80"]