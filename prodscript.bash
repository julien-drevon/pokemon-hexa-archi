#!/bin/bash
##not tested

docker build -t poke-test -f=DockerfileDev .
docker run poke-test || exit 1
docker build -t poke-prod -f=DockerfileProd .
docker run poke-prod
