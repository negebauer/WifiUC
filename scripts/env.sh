env=(
USER=YOUR_USER
PASS=YOUR_PASS
)

rm .env

for data in ${env[@]}; do
  echo $data >> .env
done
