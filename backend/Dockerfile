FROM node:18-alpine
WORKDIR /home/backend
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
CMD ["npm", "start"]