#!/bin/bash

# this is run by netlify. there is no need to run this manually.

# log
# Generate index.html and /temp assets for GH Pages branch
grunt build
grunt build-gh-pages

cp node_modules/bootstrap/dist/css/bootstrap.min.css css/bootstrap.min.css
mv temp/bootstrap-slider.css css/bootstrap-slider.css
mv temp/bootstrap-slider.js js/bootstrap-slider.js