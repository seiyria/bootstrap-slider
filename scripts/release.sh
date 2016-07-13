#!/bin/bash

# Validate arguments
versionBumpType=${1:-patch};

if [ "$versionBumpType" != "major" ] && [ "$versionBumpType" != "minor" ] && [ "$versionBumpType" != "patch" ]; then
  echo "Invalid version bump argument: ${versionBumpType}. Option must be one of the following: major, minor, patch"
  exit 1
else
  echo "Publishing and bumping with ${versionBumpType} version bump"
fi

echo "Running version bump + publish script..."
echo "."
echo "."
echo "Generating /dist and push changes + tags to Github remote 'origin'"
# Checkout master branch
git checkout master
# Version bump
grunt bump-only:"$versionBumpType"
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

## Publish to NPM
echo "."
echo "."
echo "Publishing to NPM"
echo "."
echo "."
npm publish

# Notify script is complete
echo "."
echo "."
echo "Script complete"
echo ""