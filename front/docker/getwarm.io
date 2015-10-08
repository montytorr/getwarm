# Redirect ticket-tool.com to concierge.ticket-tool.com
server {
        listen 443 ssl;

        server_name ticket-tool.com www.ticket-tool.com ~^.*\.ticket\-tool\.com;

        return 301 https://concierge.ticket-tool.com;
}

# Redirect HTTP to HTTPS
server {
        listen 80;

        server_name ticket-tool.com *.ticket-tool.com;

        # rewrite all nonssl requests to ssl
        return 301 https://$host$request_uri$is_args$args;
}
