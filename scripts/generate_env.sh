user='YOUR_USER'
pass='YOUR_PASS'

if [ ! -z  $1 ]; then user=$1; fi
if [ ! -z  $2 ]; then pass=$2; fi

env=(
USER=$user
PASS=$pass
)

rm .env

for data in ${env[@]}; do
  echo $data >> .env
done
