echo 'Checking git status...'
# if [ ! -z  $(git status --porcelain) ]; then echo 'Git repository dirty. Clean it'; exit; fi
echo 'Git clean!'

echo 'Bump major, minor, patch or none (default)\n$ \c'
read bump

echo 'Deploy alpha beta (default) store\n$ \c'
read deploy
if [ "$deploy" == '' ]; then deploy="beta"; fi

if [ ! "$bump" == 'none' ] && [ ! "$bump" == '' ]; then version=$(npm version $bump); echo "Version bumped to $version"; else npm run build; echo 'Bump build only'; fi

echo "iOS deploy: Running fastlane $deploy"
cd ios
fastlane $deploy

# echo "Android deploy: Running fastlane $deploy"
# cd ../android
# fastlane $deploy

git push --tags
