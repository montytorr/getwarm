FROM krkr/nginx:0.4.1

COPY getwarm.io /etc/nginx/sites-enabled/getwarm.io

ADD bin/run.sh /app/run.sh
ADD dist /app
CMD ["/app/run.sh"]