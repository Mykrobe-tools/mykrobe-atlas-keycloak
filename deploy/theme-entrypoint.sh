#!/bin/bash
set -e 

cp -R /app/themes /app/dist/

zip -r /app/dist/mykrobe-atlas.zip /app/dist/mykrobe-atlas/