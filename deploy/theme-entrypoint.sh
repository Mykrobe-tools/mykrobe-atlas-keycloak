#!/bin/bash
set -e 

cp -R /app/themes/base /app/dist/
cp -R /app/themes/common /app/dist/
cp -R /app/themes/keycloak /app/dist/
cp -R /app/themes/keycloak-preview /app/dist/
cp -R /app/themes/mykrobe-atlas /app/dist/

cd /app/dist/ && zip -r ./mykrobe-atlas-themes.zip ./

ls -la /app/dist/