#!/bin/bash

docker-compose down -v 
docker rmi golden-bugs-server
docker rmi golden-bugs-client
docker-compose up

