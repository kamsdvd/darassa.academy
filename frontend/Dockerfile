FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . .
RUN rm -f vite.config.js
RUN ls -l vite.config*
RUN npx tsc -b
RUN ls -l src/
RUN rm -f src/*.js
RUN ls -l src/routes/
RUN rm -f src/routes/*.js
RUN ls -l src/routes/
RUN ls -l src/pages/
RUN rm -f src/pages/*.js
RUN ls -l src/pages/
RUN npx vite build --config vite.config.ts

FROM node:lts-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./
EXPOSE 3000
#CMD ["npm", "start"]
CMD ["npm", "run", "start"]                               