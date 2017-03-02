git_commit=$(git log -1 --pretty=%B)
if [[ $git_commit == '[deploy] alpha' ]]; then
  export deploy='alpha'
elif [[ $git_commit == '[deploy] beta' ]]; then
  export deploy='beta'
else
  export deploy='none'
fi
