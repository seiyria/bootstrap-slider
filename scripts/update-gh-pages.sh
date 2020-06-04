#!/bin/bash

# log
echo "..."
echo "Updating Github.io page"
echo "..."
# Generate index.html and /temp assets for GH Pages branch
grunt build-gh-pages
# Create temporary copy of index file
cp index.html index-temp.html
# Checkout to `gh-pages` branch
git checkout -B gh-pages origin/gh-pages
git pull -r origin gh-pages
# Update dependencies
cp node_modules/jquery/dist/jquery.min.js dependencies/js/jquery.min.js
cp node_modules/popper.js/dist/umd/popper.min.js dependencies/js/popper.min.js
cp node_modules/bootstrap/dist/js/bootstrap.min.js dependencies/js/bootstrap.min.js
# Replace current files with temporary files
mv index-temp.html index.html
cp node_modules/bootstrap/dist/css/bootstrap.min.css css/bootstrap.min.css
mv temp/bootstrap-slider.css css/bootstrap-slider.css
mv temp/bootstrap-slider.js js/bootstrap-slider.js
# Remove /temp directory
rm -rf temp
# Stage new files for commit
git add index.html css/bootstrap-slider.css js/bootstrap-slider.js css/bootstrap.min.css dependencies/*
# Create commit with new files
git commit -m "updates"
# Push new source code to gh-pages branch
git push origin gh-pages:gh-pages -f
# Switch back to master branch
git checkout master
# log
echo "..."
echo "Github.io page updated"
echo "..."
