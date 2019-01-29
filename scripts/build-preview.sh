#!/bin/bash

# log
# Generate index.html and /temp assetts for GH Pages branch
grunt build-gh-pages

cp node_modules/bootstrap/dist/css/bootstrap.min.css css/bootstrap.min.css
mv temp/bootstrap-slider.css css/bootstrap-slider.css
mv temp/bootstrap-slider.js js/bootstrap-slider.js