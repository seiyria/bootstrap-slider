#!/bin/bash

echo "Running postpublish script..."
echo "."
echo "."
echo "Generating /dist and push to origin"
# Checkout master branch
git checkout master
# Version bump (patch)
grunt bump-only:patch
# Generate new dist
grunt prod
# Generate new index.html page
grunt template
# Force add dist contents
git add dist/* --force
# Commit new release tag
grunt bump-commit
# Push commits/tags to master branch on remote 'origin'
git push origin master:master && git push --tags

## Update Github pages
echo "."
echo "."
echo "Updating Github pages"
echo "."
echo "."
# Generate index.html and /temp assetts for GH Pages branch
grunt build-gh-pages
# Create temporary copy of index file
cp index.html index-temp.html
# Checkout to `gh-pages` branch
git checkout -B gh-pages origin/gh-pages
git pull -r origin gh-pages
# Replace current files with temporary files
mv index-temp.html index.html
mv temp/bootstrap-slider.css css/bootstrap-slider.css
mv temp/bootstrap-slider.js js/bootstrap-slider.js
# Remove /temp directory
rm -rf temp
# Stage new files for commit
git add index.html css/bootstrap-slider.css js/bootstrap-slider.js
# Create commit with new files
git commit -m "updates"
# Push new source code to gh-pages branch
git push origin gh-pages:gh-pages -f
# Switch back to master branch
git checkout master

# Notify that postpublish is complete
echo "."
echo "."
echo "Postpublish script complete"
echo ""