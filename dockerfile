FROM node:slim
RUN mkdir /app
RUN cd app
WORKDIR /app
ENV APPPORT=12000
ENV SESSIONNAME="Containers and Orchestration"
RUN npm install -g nodemon
RUN npm install express
RUN npm install ejs
RUN npm install cookie-parser
RUN npm install superagent
EXPOSE 12000
COPY ./app /app
CMD nodemon /app/frontend.js
