FROM node

WORKDIR /usr/app/src

COPY . .

WORKDIR /usr/app/src/backend

RUN npm ci
RUN npm run build

WORKDIR /usr/app/src/frontend

RUN npm ci
RUN npm run build
RUN cp -r dist/ /usr/app/src/backend/dist/frontend/

WORKDIR /usr/app/src/backend/

CMD [ "npm", "run", "start:js" ]