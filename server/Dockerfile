###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine As dev

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

RUN yarn prisma:generate

CMD [ "yarn", "start:dev" ]

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV prod

RUN yarn install --frozen-lockfile --production && yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As prod

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
