#!/bin/bash

docker compose down -v
docker rmi golden-bugs-client
docker rmi golden-bugs-server

