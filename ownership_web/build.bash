#!/usr/bin/env bash
rm -rf dist/
npm run build

sudo docker build -t ownership_web:"$1" .

sudo docker run -d -p 4200:80 ownership_web:"$1"