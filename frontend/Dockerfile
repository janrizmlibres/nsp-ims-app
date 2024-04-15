FROM node:20
RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app

ENV PORT=3000

COPY package*.json ./
RUN npm ci

COPY --chown=app:app . /app

CMD ["npm", "run", "dev"]