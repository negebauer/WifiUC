source scripts/const.sh
source scripts/funcs.sh

last_commit=$(git log -1 --pretty=%B)
last_commit_id=$(git log --format="%H" -n 1)
last_commit_tag=$(git describe --tags --exact-match $last_commit_id)
last_commit_tag_none='fatal: No names found, cannot describe anything.'

if [ "$last_commit" == "$message_bump_build" ]; then
  deploy_fastlane $deploy
elif [ ! "$last_commit_tag" == "$last_commit_tag_none" ]; then
  deploy_fastlane $deploy
fi
