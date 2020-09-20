# base image
FROM node:12.16.1-alpine
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers git make python
RUN npm install --quiet node-gyp -g

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN chown -R node:node .

# switch user and build app
USER node
RUN npm ci
COPY --chown=node:node . /usr/src/app
RUN npm run build

## start the app
CMD ["npm", "start"]