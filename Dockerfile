FROM node:18.4-alpine
WORKDIR /app
RUN npm install --save-dev parcel

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 8080
#CMD [ "npm", "run" , "serve"]
CMD [ "npm", "run" , "dev"]
