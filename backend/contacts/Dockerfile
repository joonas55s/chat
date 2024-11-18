
FROM node:18
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .


ENV MONGODB_NAME=Contacts
ENV SECRETE=secrete
ENV PORT=5051
ENV CLIENTID=api-contacts
ENV BROKERS=kafka1:29092

RUN npm run build

EXPOSE 5051

CMD ["node", "./dist/main/main.js","5051"]