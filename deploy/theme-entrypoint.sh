#!/bin/bash
set -e 

ls -la /app/themes/

cp -R /app/themes/ /app/dist/

ls -la /app/dist/

cd /app/dist/ && zip -r ./mykrobe-atlas.zip ./mykrobe-atlas/