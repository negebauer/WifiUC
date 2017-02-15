user='YOUR_USER'
pass='YOUR_PASS'

if [ ! -z  $1 ]; then user=$1; fi
if [ ! -z  $2 ]; then pass=$2; fi

env=(
WIFIUC_USER=$user
WIFIUC_PASS=$pass
)

rm .env
rm .env.development
rm .env.production

touch .env.development
touch .env.production

for data in ${env[@]}; do
  echo $data >> .env
done
