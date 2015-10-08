FROM krkr/nginx:0.4.1

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
COPY getwarm.io /etc/nginx/sites-enabled/getwarm.io

ADD bin/run.sh /app/run.sh
ADD dist /app

# expose both the HTTP (80) and HTTPS (443) ports
EXPOSE 80 443

CMD ["/app/run.sh"]