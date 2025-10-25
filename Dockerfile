FROM oven/bun:alpine

RUN mkdir /src

ADD . /src

WORKDIR /src

RUN bun install

CMD bun run ./bin/www
