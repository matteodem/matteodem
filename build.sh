#!/usr/bin/env bash
npm install -g meteor-build-client
mkdir -p dist
cd app
curl https://install.meteor.com/ | sh
meteor="$HOME/.meteor"
meteor-build-client ../dist/
