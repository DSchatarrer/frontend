#!/bin/sh

# function check_and_replace() {
#     VAR_NAME=$1
#     VAR_VALUE=$(printenv $VAR_NAME)

#     if [ -z "$VAR_VALUE" ]; then
#         echo "Warning: $VAR_NAME environment variable is not set"
#     else
#         # Replace the variable in the index.html file
#         sed -i "s#\%%{$VAR_NAME}%%#$VAR_VALUE#g" /usr/share/nginx/html/index.html
#     fi
# }

# check_and_replace "VUE_APP_API_URL"
# check_and_replace "VUE_APP_CLIENT_ID"
# check_and_replace "VUE_APP_GROUP_ID"
# check_and_replace "VUE_APP_LOGIN_REDIRECT"
# check_and_replace "VUE_APP_TENANT_ID"
# check_and_replace "VUE_APP_HOST_NAME"
# check_and_replace "VUE_APP_APPLICATIONINSIGHTS_CONNECTION_STRING"

# Simplemente inicia Nginx para ver si funciona
nginx -g 'daemon off;'