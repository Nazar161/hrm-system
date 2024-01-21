ARG NODE_VERSION=20.11.0

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:${NODE_VERSION}-alpine As dev

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

FROM node:${NODE_VERSION}-alpine As build

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

FROM node:${NODE_VERSION}-alpine As prod

COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/src/database ./src/database
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "yarn", "start:migrate:prod" ]
