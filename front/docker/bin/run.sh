#!/bin/bash -x

API_NGINX_CONF="/etc/nginx/sites-enabled/getwarm.io"

sed -e "s/{{ api_host }}/$API_HOST/g" \
    -e "s/{{ api_http_port }}/$API_HTTP_PORT/g" \
    -i "$API_NGINX_CONF"

INDEX="/app/index.html"

sed -e "s/getwarm.io/$FRONT_API_HOST:$FRONT_API_HTTPS_PORT/g" \
    -i "$INDEX"
  
exec nginx
