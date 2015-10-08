server {
  root /var/www;
  index index.html index.htm;

  # Make site accessible from http://getwarm.io/
  server_name getwarm.io;

  # Add 1 day expires header for static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 1d;
  }

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to redirecting to index.html
    try_files $uri $uri/ @root;
  }

  # If nginx can't find a file, fallback to the homepage.
  location @root {
    rewrite .* / redirect;
  }
}
