#!/bin/bash

# Install bower deps (NOTE: I have no idea why this is here but will keep it for time being)
bower install

# Version bump (patch by default)
grunt bump-only:patch
grunt bump-commit

# Generate new dist and commit
grunt prod
git add dist/ -f
git commit -m "new dist"

# Push commits/tags to master branch on remote 'origin'
git push origin master && git push --tags origin master