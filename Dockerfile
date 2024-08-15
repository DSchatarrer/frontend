FROM nginx:1.25-alpine3.18-slim  AS production-stage
COPY dist /usr/share/nginx/html
COPY infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
COPY infrastructure/entrypoint.sh .
RUN apk update && apk upgrade
RUN addgroup -S user
RUN adduser -S -G user user
RUN chmod -R 755 /etc/nginx/nginx.conf
RUN chmod -R 755 /etc/nginx/mime.types
RUN chmod -R 777 /usr/share/nginx/html
RUN chmod -R 777 /entrypoint.sh
# Configura el script de entrada como el comando principal del contenedor

USER user
EXPOSE 8888

ENTRYPOINT ["/entrypoint.sh"]