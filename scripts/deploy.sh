# Check git
echo 'Checking git status...'
if [[ ! -z  $(git status --porcelain) ]]; then echo 'Git repository dirty. Clean it'; exit; fi
echo 'Git clean!'
echo ''

prompt='\n$ \c'
# Two options
# 1. New production release: This goes along with a new tag and build bump
# 2. New development version: This goes along a build bump and can be
#   2.1. Alpha
#   2.2. Beta
deploy_default='d'
echo "production (p) or development (d) [default]$prompt"
read deploy

if [[ -z $deploy ]]; then deploy=$deploy_default; fi

commit='[deploy] ERROR'
if [[ $deploy == 'd' ]]; then
  dev_default='b'
  echo "beta (b) [default] or alpha (a)$prompt"
  read dev
  if [[ -z $dev ]]; then dev=$dev_default; fi
  if [[ $dev == 'b' ]]; then
    commit='[deploy] beta'
  elif [[ $dev == 'a' ]]; then
    commit='[deploy] alpha'
  else
    echo "Not a valid dev deploy ($dev)"
    exit
  fi
  react-native-version -b
  git commit -am "$commit"
elif [[ $deploy == 'p' ]]; then
  version_default='p'
  echo "major (M), minor (m), patch (p) [default]$prompt"
  read version
  if [[ -z $version ]]; then version=$version_default; fi
  if [[ $version == 'M' ]]; then
    npm version major -m "[deploy] %s"
  elif [[ $version == 'm' ]]; then
    npm version minor -m "[deploy] %s"
  elif [[ $version == 'p' ]]; then
    npm version patch -m "[deploy] %s"
  else
    "Not a valid version ($version)"
    exit
  fi
else
  echo "Not a valid deploy ($deploy)"
  exit
fi

git push
git push --tags
