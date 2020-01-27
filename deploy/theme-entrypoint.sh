#!/bin/bash
set -e 

cp -R /app/themes /app/dist/

cd /app/dist/ && zip -r ./mykrobe-atlas.zip ./mykrobe-atlas/