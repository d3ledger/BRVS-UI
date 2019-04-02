#!/bin/bash

# Go to client src folder
cd client

# Build production version
yarn build

# Move files to docker static server
mv ./dist/* ../server/static/

echo "Success!"
