FROM node:16-alpine as base

WORKDIR /app/

COPY package.json yarn.lock .npmrc ./
RUN yarn install --frozen-lockfile --production

FROM base as builder
RUN yarn install --frozen-lockfile --production=false

COPY . .

# ENV NODE_ENV=production
ARG BUILD_BRANCH
RUN ./env-preset.sh $BUILD_BRANCH
RUN yarn build

FROM builder

# ENV NODE_ENV=production

COPY . .
COPY --from=builder /app/.next /app/.next

EXPOSE 3000

COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD yarn start
