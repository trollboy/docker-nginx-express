# Use an official Python runtime as a parent image
FROM node:10.0.0

WORKDIR /app
ADD . /app

RUN npm install

EXPOSE 80

CMD ["node", "/app/index.js", "80"] 