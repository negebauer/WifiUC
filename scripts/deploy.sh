echo 'Checking git status...'
# if [ ! -z  $(git status --porcelain) ]; then echo 'Git repository dirty. Clean it'; exit; fi
echo 'Git clean!'

echo 'Bump major, minor, patch or none:'
read bump
if [ ! "$bump" == 'none' ]; then version=$(npm version $bump); echo "Version bumped to $version"; fi

git diff android/app/build.gradle
# python scripts/bump.py
# export a=4
# echo "version $version $a"


# if [ -f /var/log/messages ]
#   then
#     echo "/var/log/messages exists."
# fi
