#!/bin/bash

# Install bower deps
bower install

# Version bump (minor by default)
grunt bump-only:minor
grunt bump-commit

# Generate new dist and commit
grunt prod
git add dist/*
git commit -m "new dist"

# Push commits to master branch on remote 'origin'
git push origin master && git push --tags origin master