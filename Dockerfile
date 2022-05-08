# FROM node:14 AS ui-build
# WORKDIR /usr/src/app
# COPY . .
# RUN yarn install @angular/cli && yarn install && npm run build

FROM node:14-bullseye-slim AS server-build
WORKDIR /usr/src/app
# COPY --from=ui-build /usr/src/app/my-app/dist ./my-app/dist
COPY . .
COPY package*.json ./
RUN npm install server --omit=dev
EXPOSE 8050

CMD ["npm", "run", "--prefix=server", "start:docker"]