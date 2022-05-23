#!/bin/bash
set -e

IP=`ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1`
echo $IP
pushd `dirname $0`

echo "EXTERNAL_HOST=$IP" > .env

nerdctl compose up -d  --build

nerdctl compose ps

popd
