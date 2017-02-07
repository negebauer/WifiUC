# Set some data
export ICON="$(pwd)/assets/icon.png"
export ICON_WATCH="$(pwd)/assets/icon.png"

echo 'iOS metadata'
cd ios
fastlane metadata

echo 'Android metada'
# cd ../android
# fastlane metadata
