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

if [ "$deploy" == '' ]; then deploy="beta"; fi

if [ ! "$bump" == 'none' ] && [ ! "$bump" == '' ]; then version=$(npm version $bump); echo "Version bumped to $version"; else npm run bump_build; echo 'Bump build only'; fi

echo "iOS deploy: Running fastlane $deploy"
cd ios
fastlane $deploy

echo "Android deploy: Running fastlane $deploy"
cd ../android
fastlane $deploy

git push --tags
