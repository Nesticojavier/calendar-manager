# Etapa de construcción
FROM node:17-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Servir archivos estáticos
COPY --from=builder /app/dist /usr/share/nginx/html

# añadir configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]