FROM node:18
WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .

ENV MONGODB_NAME=Messages
ENV SECRETE=secrete
ENV PORT=5055
ENV REDIS_PORT=6379
ENV REDIS_HOST=redis
ENV REDIS_PASSWORD=123@Mudar
ENV CLIENTID=api-contacts
ENV BROKERS=kafka1:29092

RUN npm run build


EXPOSE 5055

CMD ["node", "./dist/main/main.js","5055"]