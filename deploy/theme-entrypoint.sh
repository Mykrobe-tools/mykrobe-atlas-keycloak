#!/bin/bash
set -e 

ls -la /app/themes/

cp -R /app/themes/base /app/dist/
cp -R /app/themes/common /app/dist/
cp -R /app/themes/keycloak /app/dist/
cp -R /app/themes/keycloak-preview /app/dist/
cp -R /app/themes/mykrobe-atlas /app/dist/

ls -la /app/dist/

cd /app/dist/ && zip -r ./mykrobe-atlas.zip ./mykrobe-atlas/