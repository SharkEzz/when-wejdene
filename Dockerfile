FROM node:20-alpine as builder

WORKDIR /build
COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build

FROM nginx:1.27-alpine as runner

COPY --from=builder /build/dist /usr/share/nginx/html
