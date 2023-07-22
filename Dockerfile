FROM node:18-alpine as build

ARG CACHEBUST=1

ARG GITHUB_TOKEN=${GITHUB_TOKEN}

ENV GITHUB_TOKEN=${GITHUB_TOKEN}

WORKDIR /usr/app

COPY . /usr/app
COPY .npmrc .

RUN yarn install --frozen-lockfile --network-timeout 1000000
RUN GITHUB_TOKEN=$GITHUB_TOKEN yarn build

FROM nginx:1.23.1-alpine

EXPOSE 80

COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
