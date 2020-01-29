#!/bin/bash
set -e 

cp -R /app/themes/base /app/dist/
cp -R /app/themes/common /app/dist/
cp -R /app/themes/keycloak /app/dist/
cp -R /app/themes/keycloak-preview /app/dist/
cp -R /app/themes/mykrobe-atlas /app/dist/

cd /app/dist/ && tar -cv ./ | gzip > mykrobe-atlas-themes.tar.gz

ls -la /app/dist/