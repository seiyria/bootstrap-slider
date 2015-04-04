#!/bin/bash

# Install bower deps (NOTE: I have no idea why this is here but will keep it for time being)
bower install

# Version bump (patch by default)
grunt bump-only:patch
# Generate new dist
grunt prod
# Commit new release tag
grunt bump-commit

# Push commits/tags to master branch on remote 'origin'
git push origin master && git push --tags origin master