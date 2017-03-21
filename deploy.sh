#!/usr/bin/env bash
mkdir -p dist
cd app
meteor-build-client ../dist/
cd ../dist
surge ./ --domain=matteodem.ch
cd ..

