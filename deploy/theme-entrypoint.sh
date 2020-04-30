#!/bin/bash
set -e 

cp -R /app/themes/mykrobe-atlas /app/dist/

cd /app/dist/ && tar -cvzf mykrobe-atlas-themes.tar.gz ./mykrobe-atlas

ls -la /app/dist/