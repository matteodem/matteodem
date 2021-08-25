#!/usr/bin/env bash
npm install -g meteor-build-client
mkdir -p dist
cd app
curl https://install.meteor.com/ | sh
meteor="$HOME/.meteor"
#cp "/opt/buildhome/.meteor/packages/meteor-tool/2.3.5/mt-os.linux.x86_64/scripts/admin/launch-meteor" /usr/bin/meteor
meteor --help
