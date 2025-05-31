FROM node:22-alpine AS builder

WORKDIR /build
COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build

FROM nginx:1.28-alpine AS runner

COPY --from=builder /build/dist /usr/share/nginx/html
