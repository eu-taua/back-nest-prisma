FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn 

RUN npx prisma generate

COPY . .

RUN yarn build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


EXPOSE 3333
CMD ["yarn","start:migrate:prod"]