#!/bin/bash

VERSION=$1

if [ -z $VERSION ]; then
  echo "No version specified. Expected command call: $0 1.2.3"
  exit 1
fi

if [ -f CHANGELOG.md ]; then
  grep '## Upcoming' CHANGELOG.md > /dev/null

  if [ "$?" == 0 ]; then
    printf "Modifying change log ... "
    sed -i "" "s/## Upcoming/## $VERSION - `date +%Y-%m-%d`/" CHANGELOG.md
    git add CHANGELOG.md
    git commit -m "Add changes for version: v$VERSION"
    echo "done."
  fi
fi

printf "Bumping package version ... "
npm version $VERSION -m "Bump to version: v$VERSION"
echo "done."

git push
git push --tags
