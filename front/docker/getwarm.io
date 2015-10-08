server {
  listen 80;

  server_name www.getwarm.io getwarm.io dev.l0cal;

        root /app/src;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }
    }
}
