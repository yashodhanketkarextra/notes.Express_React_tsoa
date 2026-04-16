FROM node:24-alpine

RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate

EXPOSE 5000
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start:prod"]
