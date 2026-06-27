FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src ./src
RUN mkdir -p /app/uploads

ENV NODE_ENV=production
ENV APP_PORT=8080
EXPOSE 8080

CMD ["node", "src/server.js"]
