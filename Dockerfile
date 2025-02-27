FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

COPY .env.example .env

FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM base AS production

RUN npm install --production

COPY . .

RUN npm run build

COPY .env.example .env

FROM nginx:alpine as final

COPY --from=production /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
