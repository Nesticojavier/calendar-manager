#!/bin/bash

sudo down -v 
sudo docker rmi golden-bugs-server
sudo docker rmi golden-bugs-client
sudo docker-compose up

