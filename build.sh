#!/usr/bin/env bash
npm install -g meteor-build-client
mkdir -p dist
cd app
meteor-build-client ../dist/
