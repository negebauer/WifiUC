devices_list=$(adb devices)
devices_list_empty='List of devices attached'

sleep_time=12
sleep_message="Waiting $sleep_time sec before building..."

if [ "$devices_list" == "$devices_list_empty" ]; then
  echo 'No emulator running'
  echo 'Launching emulator'
  emulator @reactnative -no-boot-anim & echo $sleep_message; sleep $sleep_time; react-native run-android
else
  echo 'Emulator already running'
  react-native run-android
fi
