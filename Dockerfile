FROM dockerfile/nginx

RUN rm -rf /var/www/html
COPY .tmp/ /var/www/html/

EXPOSE 80