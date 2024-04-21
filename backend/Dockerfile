FROM node:20
RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /app

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

COPY package*.json ./
RUN npm ci

COPY --chown=app:app . /app

CMD ["npm", "start"]