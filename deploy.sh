mkdir -p dist
cd app
meteor-build-client ../dist/
cd ../dist
surge ./ --domain=matteodem.surge.sh
cd ..

