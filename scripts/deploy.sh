source scripts/const.sh
source scripts/funcs.sh

echo 'Checking git status...'
if [ ! -z  $(git status --porcelain) ]; then echo 'Git repository dirty. Clean it'; exit; fi
echo 'Git clean!'

if [ ! -z $1 ]; then
  bump=$1
else
  echo 'Bump major, minor, patch or none (default)\n$ \c'
  read bump
fi

if [ ! -z $2 ]; then
  deploy=$2
else
  echo 'Deploy alpha beta (default) store\n$ \c'
  read deploy
fi

if [ "$bump" == 'none' ]; then
  npm run bump_build
else
  npm version $bump
fi

deploy_fastlane $deploy

git push --tags
