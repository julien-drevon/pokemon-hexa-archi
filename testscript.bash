#!/bin/bash
##not tested
docker build -t nest-test -f=DockerfileDev .
docker run nest-test