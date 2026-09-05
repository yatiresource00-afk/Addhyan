FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY scripts ./scripts

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV DATABASE_URL=file:./data/addhyan.db

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
