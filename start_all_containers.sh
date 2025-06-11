#!/bin/sh
#Starting all containers

cd emulator || exit
docker compose up -d --build
cd ..
cd front || exit
docker compose up -d --build
cd ..
docker ps -a
