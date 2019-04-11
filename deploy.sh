#!/usr/bin/env bash
mkdir -p dist
cd app
meteor-build-client ../dist/
cd ../dist
mv index.html 200.html
surge ./ --domain=matteodem.ch
cd ..

