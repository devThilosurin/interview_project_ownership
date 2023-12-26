FROM nginx:alpine as run-stage
COPY ./dist/ownership_web/browser/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf