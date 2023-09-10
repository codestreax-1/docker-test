FROM alpine:latest
RUN apk --no-cache add g++
RUN adduser -D sandbox
USER sandbox
WORKDIR /home/sandbox
