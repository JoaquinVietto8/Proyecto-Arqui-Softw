FROM node:16

EXPOSE 3000

ADD . /Carrito
WORKDIR /Carrito

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]