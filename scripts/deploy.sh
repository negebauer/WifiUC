echo 'Checking git status...'
# if [ ! -z  $(git status --porcelain) ]; then echo 'Git repository dirty. Clean it'; exit; fi
echo 'Git clean!'

echo 'Bump major, minor, patch or none\n$ \c'
read bump
if [ ! "$bump" == 'none' ] && [ ! "$bump" == "" ]; then version=$(npm version $bump); echo "Version bumped to $version"; else echo 'No bump'; fi

echo 'Deploy alpha beta store\n$ \c'
read deploy

echo 'iOS deploy'
cd ios
fastlane $deploy

# echo 'Android deploy'
# cd ../android
# fastlane $deploy
