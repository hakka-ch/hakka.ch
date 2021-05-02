FROM node:14 as builder
WORKDIR /build
ADD ./lib/ogp-getter /build
ADD ./package.json /build
ADD ./package-lock.json /build
RUN npm install --production

FROM gcr.io/distroless/nodejs:14-debug
WORKDIR /app
COPY --from=builder /build /app
CMD ["index.js"]
