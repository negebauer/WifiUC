git_commit=$(git log -1 --pretty=%B)
if [[ $git_commit == '[deploy] alpha' ]]; then
  echo 'alpha'
elif [[ $git_commit == '[deploy] beta' ]]; then
  echo 'beta'
else
  echo 'none'
fi
