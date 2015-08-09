#!/bin/bash

currentBranch=$(git rev-parse --abbrev-ref HEAD)

if [ currentBranch = "master" ]
then
	echo "Running postpublish script"

	# Version bump (patch)
	grunt bump-only:patch
	# Generate new dist
	grunt prod
	# Commit new release tag
	grunt bump-commit

	# Push commits/tags to master branch on remote 'origin'
	git push origin master && git push --tags origin master

	# Push new source code to gh-pages branch
	
else
	echo "Cannot run postpublish script on branch that is not 'master'"
fi
