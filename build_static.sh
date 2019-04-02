#!/bin/bash

# Go to client src folder
cd client

# Build production version
yarn build

# Move files to go static server
rm -rf ../server/static
mkdir ../server/static
mv -fv ./dist/* ../server/static

echo "Success!"
