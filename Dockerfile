FROM node:14.17.6-slim

LABEL maintainer="Anurag Vohra"
LABEL version="0.0.1"
LABEL description="base socket cluster app"

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY . /usr/src/

RUN npm install .

EXPOSE 8000

CMD ["npm", "run", "start:docker"]
